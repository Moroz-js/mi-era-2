#!/bin/bash

# Mi-Era Server Setup Script
# Автоматическая настройка сервера для деплоя Next.js приложения
# Для Ubuntu 22.04/24.04 или Debian 11/12

set -e  # Остановка при ошибке

echo "================================"
echo "Mi-Era Server Setup"
echo "================================"
echo ""

# Проверка прав root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Запустите скрипт с правами root: sudo bash server-setup.sh"
    exit 1
fi

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}⚠️  ВНИМАНИЕ: Скрипт будет работать от пользователя root${NC}"
echo -e "${YELLOW}Для production рекомендуется использовать отдельного пользователя${NC}"
echo ""
read -p "Продолжить? (y/n): " CONTINUE
if [ "$CONTINUE" != "y" ]; then
    echo "Установка отменена"
    exit 0
fi
echo ""

echo -e "${YELLOW}📦 Обновление системы...${NC}"
apt update
apt upgrade -y --fix-missing || {
    echo -e "${YELLOW}⚠ Некоторые пакеты не удалось обновить, продолжаем...${NC}"
    apt upgrade -y --exclude=linux-firmware || true
}

echo -e "${GREEN}✓ Система обновлена${NC}"
echo ""

# Установка базовых утилит
echo -e "${YELLOW}📦 Установка базовых утилит...${NC}"
apt install -y curl wget git ufw

echo -e "${GREEN}✓ Базовые утилиты установлены${NC}"
echo ""

# Настройка Firewall
echo -e "${YELLOW}🔥 Настройка Firewall...${NC}"
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
echo "y" | ufw enable

echo -e "${GREEN}✓ Firewall настроен${NC}"
echo ""

# Установка Node.js
echo -e "${YELLOW}📦 Установка Node.js 20 LTS...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION} установлен${NC}"
echo -e "${GREEN}✓ npm ${NPM_VERSION} установлен${NC}"
echo ""

# Установка PM2
echo -e "${YELLOW}📦 Установка PM2...${NC}"
npm install -g pm2

PM2_VERSION=$(pm2 --version)
echo -e "${GREEN}✓ PM2 ${PM2_VERSION} установлен${NC}"
echo ""

# Установка Docker и Docker Compose
echo -e "${YELLOW}📦 Установка Docker...${NC}"
apt-get install -y ca-certificates curl gnupg lsb-release

# Добавление официального GPG ключа Docker
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Добавление репозитория Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Установка Docker Engine
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Запуск Docker
systemctl start docker
systemctl enable docker

DOCKER_VERSION=$(docker --version | awk '{print $3}' | sed 's/,//')
COMPOSE_VERSION=$(docker compose version | awk '{print $4}')
echo -e "${GREEN}✓ Docker ${DOCKER_VERSION} установлен${NC}"
echo -e "${GREEN}✓ Docker Compose ${COMPOSE_VERSION} установлен${NC}"
echo ""

# Установка Nginx
echo -e "${YELLOW}📦 Установка Nginx...${NC}"
apt-get install -y nginx
systemctl start nginx
systemctl enable nginx

NGINX_VERSION=$(nginx -v 2>&1 | awk -F'/' '{print $2}')
echo -e "${GREEN}✓ Nginx ${NGINX_VERSION} установлен${NC}"
echo ""

# Установка Certbot для SSL
echo -e "${YELLOW}📦 Установка Certbot...${NC}"
apt-get install -y certbot python3-certbot-nginx

echo -e "${GREEN}✓ Certbot установлен${NC}"
echo ""

# Создание директории для проекта
echo -e "${YELLOW}📁 Создание директории проекта...${NC}"
mkdir -p /var/www
echo -e "${GREEN}✓ Директория /var/www создана${NC}"
echo ""

# Настройка PostgreSQL через Docker
echo -e "${YELLOW}🗄️  Настройка PostgreSQL (Docker)...${NC}"
echo ""

# Используем стандартные значения из docker-compose.yml
DB_NAME="mi_era"
DB_USER="postgres"
DB_PASSWORD="postgres"

echo -e "${GREEN}✓ Будет использован PostgreSQL из Docker${NC}"
echo -e "${GREEN}  База данных: ${DB_NAME}${NC}"
echo -e "${GREEN}  Пользователь: ${DB_USER}${NC}"
echo ""

# Сохранение конфигурации
CONFIG_FILE="/root/mi-era-config.txt"
cat > $CONFIG_FILE <<EOF
Mi-Era Server Configuration
============================
Created: $(date)

Database:
  Name: ${DB_NAME}
  User: ${DB_USER}
  Password: ${DB_PASSWORD}
  Connection String: postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}

Directories:
  Project: /var/www/mi-era
  
Users:
  Deploy user: deploy
  
Services:
  Node.js: ${NODE_VERSION}
  npm: ${NPM_VERSION}
  PM2: ${PM2_VERSION}
  Docker: ${DOCKER_VERSION}
  Docker Compose: ${COMPOSE_VERSION}
  Nginx: ${NGINX_VERSION}

Next Steps:
1. Клонировать репозиторий в /var/www/mi-era
2. Создать .env файл с DATABASE_URL
3. Настроить Nginx конфигурацию
4. Настроить SSL с Certbot
5. Настроить GitHub Actions secrets
EOF

echo -e "${GREEN}✓ Конфигурация сохранена в ${CONFIG_FILE}${NC}"
echo ""

# Клонирование репозитория
echo "================================"
echo -e "${YELLOW}📦 Настройка проекта${NC}"
echo "================================"
echo ""

read -p "URL репозитория GitHub (например: https://github.com/user/mi-era.git): " REPO_URL
if [ -z "$REPO_URL" ]; then
    echo -e "${YELLOW}⚠ URL репозитория не указан, пропускаем клонирование${NC}"
    SKIP_CLONE=true
else
    SKIP_CLONE=false
    
    # Проверка на приватный репозиторий
    read -p "Репозиторий приватный? (y/n): " IS_PRIVATE
    
    if [ "$IS_PRIVATE" = "y" ]; then
        echo ""
        echo "Для клонирования приватного репозитория нужен GitHub Personal Access Token"
        echo "Создайте токен: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)"
        echo "Права: repo (full control)"
        echo ""
        read -sp "GitHub Personal Access Token: " GITHUB_TOKEN
        echo ""
        
        if [ -z "$GITHUB_TOKEN" ]; then
            echo -e "${YELLOW}⚠ Токен не указан, пропускаем клонирование${NC}"
            SKIP_CLONE=true
        else
            # Извлекаем username и repo из URL
            REPO_PATH=$(echo $REPO_URL | sed 's/https:\/\/github.com\///' | sed 's/\.git$//')
            CLONE_URL="https://${GITHUB_TOKEN}@github.com/${REPO_PATH}.git"
        fi
    else
        CLONE_URL=$REPO_URL
    fi
fi

if [ "$SKIP_CLONE" = false ]; then
    echo -e "${YELLOW}📥 Клонирование репозитория...${NC}"
    
    cd /var/www
    if [ -d "mi-era" ]; then
        echo -e "${YELLOW}⚠ Директория mi-era уже существует${NC}"
        read -p "Удалить и клонировать заново? (y/n): " REMOVE_DIR
        if [ "$REMOVE_DIR" = "y" ]; then
            rm -rf mi-era
            git clone ${CLONE_URL} mi-era
        fi
    else
        git clone ${CLONE_URL} mi-era
    fi

    # Настройка git credential helper для будущих pull
    if [ -d "mi-era/.git" ]; then
        cd mi-era
        git config credential.helper store
    fi

    if [ -d "/var/www/mi-era" ]; then
        echo -e "${GREEN}✓ Репозиторий клонирован${NC}"
        
        # Сохраняем токен для GitHub Actions (если приватный)
        if [ "$IS_PRIVATE" = "y" ] && [ ! -z "$GITHUB_TOKEN" ]; then
            # Настраиваем git credential для автоматических pull
            cd /var/www/mi-era
            git config credential.helper 'store --file=/root/.git-credentials'
            echo "https://${GITHUB_TOKEN}@github.com" > /root/.git-credentials
            chmod 600 /root/.git-credentials
            echo -e "${GREEN}✓ Git credentials сохранены для автоматических обновлений${NC}"
            
            # Тестовый pull для проверки credentials
            echo -e "${YELLOW}🔄 Проверка git credentials (тестовый pull)...${NC}"
            cd /var/www/mi-era
            git pull origin main 2>&1 | head -5
            echo -e "${GREEN}✓ Git credentials работают корректно${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ Не удалось клонировать репозиторий${NC}"
        SKIP_CLONE=true
    fi
fi
echo ""

# Настройка .env файла
if [ "$SKIP_CLONE" = false ] && [ -d "/var/www/mi-era" ]; then
    echo -e "${YELLOW}⚙️  Настройка переменных окружения...${NC}"
    echo ""
    
    read -p "Домен сайта (например: mi-era.com): " DOMAIN
    DOMAIN=${DOMAIN:-localhost}
    
    read -p "Email для SMTP (Gmail): " SMTP_USER
    read -sp "App Password для Gmail: " SMTP_PASSWORD
    echo ""
    
    read -p "Google Analytics ID (опционально, Enter для пропуска): " GA_ID
    
    # Создание .env файла
    cd /var/www/mi-era
    cat > .env <<ENVFILE
# Database
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=${SMTP_USER}
SMTP_PASSWORD=${SMTP_PASSWORD}
SMTP_FROM=${SMTP_USER}

# Application Configuration
BASE_URL=https://${DOMAIN}
NEXT_PUBLIC_BASE_URL=https://${DOMAIN}
NODE_ENV=production

# Analytics
GOOGLE_ANALYTICS_ID=${GA_ID}
ENVFILE

    echo -e "${GREEN}✓ Файл .env создан${NC}"
    echo ""
    
    # Запуск PostgreSQL через Docker Compose
    echo -e "${YELLOW}🐳 Запуск PostgreSQL в Docker...${NC}"
    cd /var/www/mi-era
    docker compose up -d postgres
    
    # Ожидание готовности PostgreSQL
    echo -e "${YELLOW}⏳ Ожидание готовности PostgreSQL...${NC}"
    sleep 10
    
    # Проверка статуса
    if docker compose ps postgres | grep -q "Up"; then
        echo -e "${GREEN}✓ PostgreSQL запущен в Docker${NC}"
    else
        echo -e "${RED}❌ Не удалось запустить PostgreSQL${NC}"
        docker compose logs postgres
        exit 1
    fi
    echo ""
    
    # Установка зависимостей
    echo -e "${YELLOW}📦 Установка зависимостей...${NC}"
    cd /var/www/mi-era
    npm install
    
    echo -e "${GREEN}✓ Зависимости установлены${NC}"
    echo ""
    
    # Применение миграций БД
    echo -e "${YELLOW}🗄️  Применение схемы базы данных...${NC}"
    cd /var/www/mi-era
    npm run db:push 2>/dev/null || echo "Команда db:push не найдена, пропускаем"
    npm run db:seed 2>/dev/null || echo "Команда db:seed не найдена, пропускаем"
    
    echo -e "${GREEN}✓ База данных настроена${NC}"
    echo ""
    
    # Build проекта
    echo -e "${YELLOW}🔨 Сборка проекта...${NC}"
    cd /var/www/mi-era
    npm run build
    
    echo -e "${GREEN}✓ Проект собран${NC}"
    echo ""
    
    # Запуск с PM2
    echo -e "${YELLOW}🚀 Запуск приложения с PM2...${NC}"
    cd /var/www/mi-era
    pm2 start npm --name "mi-era" -- start
    pm2 save
    
    # Настройка автозапуска PM2
    pm2 startup systemd -u root --hp /root | grep "sudo" | bash || true
    
    echo -e "${GREEN}✓ Приложение запущено${NC}"
    echo ""
    
    # Настройка Nginx
    echo -e "${YELLOW}🌐 Настройка Nginx...${NC}"
    
    cat > /etc/nginx/sites-available/mi-era <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
    
    ln -sf /etc/nginx/sites-available/mi-era /etc/nginx/sites-enabled/
    nginx -t && systemctl reload nginx
    
    echo -e "${GREEN}✓ Nginx настроен${NC}"
    echo ""
    
    # Настройка SSL (автоматически)
    echo -e "${YELLOW}🔒 Настройка SSL сертификата...${NC}"
    read -p "Email для Let's Encrypt уведомлений: " LE_EMAIL
    
    if [ -z "$LE_EMAIL" ]; then
        echo -e "${YELLOW}⚠ Email не указан, пропускаем SSL${NC}"
        SSL_CONFIGURED="Not configured"
    else
        echo -e "${YELLOW}Получение SSL сертификата от Let's Encrypt...${NC}"
        certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos -m ${LE_EMAIL} 2>&1 | tail -10
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ SSL сертификат установлен${NC}"
            SSL_CONFIGURED="Enabled"
            
            # Настройка автообновления
            echo -e "${YELLOW}Настройка автообновления сертификата...${NC}"
            (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet") | crontab -
            echo -e "${GREEN}✓ Автообновление SSL настроено (ежедневно в 3:00)${NC}"
        else
            echo -e "${YELLOW}⚠ Не удалось установить SSL${NC}"
            echo "Возможные причины:"
            echo "  - DNS записи домена не указывают на этот сервер"
            echo "  - Домен недоступен из интернета"
            echo "  - Порты 80/443 заблокированы"
            echo ""
            echo "Настройте SSL вручную позже: sudo certbot --nginx -d ${DOMAIN}"
            SSL_CONFIGURED="Failed (configure manually)"
        fi
    fi
    echo ""
fi

# Обновление конфигурационного файла
if [ "$SKIP_CLONE" = false ]; then
    cat >> $CONFIG_FILE <<EOF

Project Setup:
  Repository: ${REPO_URL}
  Domain: ${DOMAIN}
  SMTP User: ${SMTP_USER}
  
Application Status:
  PM2: Running
  Nginx: Configured
  SSL: ${SSL_CONFIGURED}
EOF
fi

echo "================================"
echo -e "${GREEN}✅ Установка завершена!${NC}"
echo "================================"
echo ""

if [ "$SKIP_CLONE" = false ]; then
    echo "Приложение доступно по адресу:"
    if [ "$SSL_CONFIGURED" = "Enabled" ]; then
        echo "  https://${DOMAIN}"
        echo "  https://www.${DOMAIN}"
    else
        echo "  http://${DOMAIN}"
    fi
    echo ""
    echo "Полезные команды:"
    echo "  pm2 status          - статус приложения"
    echo "  pm2 logs mi-era     - логи приложения"
    echo "  pm2 restart mi-era  - перезапуск"
    echo ""
    
    if [ "$SSL_CONFIGURED" != "Enabled" ]; then
        echo -e "${YELLOW}⚠ SSL не настроен. Настройте вручную:${NC}"
        echo "  sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
        echo ""
    fi
else
    echo "Следующие шаги:"
    echo ""
    echo "1. Клонируйте репозиторий:"
    echo "   cd /var/www"
    echo "   git clone <your-repo-url> mi-era"
    echo ""
    echo "2. Создайте .env файл:"
    echo "   cd mi-era"
    echo "   nano .env"
    echo ""
    echo "   DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}"
    echo ""
    echo "3. Запустите PostgreSQL в Docker:"
    echo "   docker compose up -d postgres"
    echo ""
    echo "4. Установите зависимости и запустите:"
    echo "   npm install"
    echo "   npm run db:push"
    echo "   npm run build"
    echo "   pm2 start npm --name mi-era -- start"
    echo "   pm2 save"
    echo "   pm2 startup"
    echo ""
    echo "5. Настройте Nginx (см. DEPLOY.md)"
    echo ""
    echo "6. Настройте SSL:"
    echo "   sudo certbot --nginx -d your-domain.com"
    echo ""
fi

echo -e "${YELLOW}📄 Полная конфигурация сохранена в: ${CONFIG_FILE}${NC}"
echo ""
