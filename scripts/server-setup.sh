#!/bin/bash
# Mi-Era Server Setup (Docker-first)
# Ubuntu 22.04/24.04, Debian 11/12

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

DEFAULT_REPO_URL="https://github.com/Moroz-js/mi-era-2.git"
DEFAULT_DOMAIN="mi-era.org"
DEFAULT_LE_EMAIL="vm@xmethod.de"
DEFAULT_SMTP_USER="no-reply@mi-era.org"
DEFAULT_GTM_ID="GTM-5PKVTR4Q"

echo "================================"
echo "Mi-Era Server Setup (Docker)"
echo "================================"
echo ""

if [ "${EUID:-0}" -ne 0 ]; then
  echo "❌ Run as root: sudo bash server-setup.sh"
  exit 1
fi

have_cmd() { command -v "$1" >/dev/null 2>&1; }
is_ubuntu() { [ -f /etc/os-release ] && grep -qi 'ubuntu' /etc/os-release; }
is_debian() { [ -f /etc/os-release ] && grep -qi 'debian' /etc/os-release; }

echo -e "${YELLOW}⚠️  Скрипт настроит Docker + Nginx + SSL и запустит проект через docker compose.${NC}"
read -p "Продолжить? (y/n): " CONTINUE
if [ "$CONTINUE" != "y" ]; then
  echo "Отменено."
  exit 0
fi
echo ""

echo -e "${YELLOW}📦 Обновление системы...${NC}"
apt update
apt upgrade -y --fix-missing || true
echo -e "${GREEN}✓ Система обновлена${NC}"
echo ""

echo -e "${YELLOW}📦 Установка базовых утилит...${NC}"
apt install -y curl wget git ufw ca-certificates gnupg lsb-release
echo -e "${GREEN}✓ Базовые утилиты установлены${NC}"
echo ""

echo -e "${YELLOW}🔥 Настройка Firewall...${NC}"
ufw allow OpenSSH || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
echo "y" | ufw enable >/dev/null 2>&1 || true
echo -e "${GREEN}✓ Firewall настроен${NC}"
echo ""

echo -e "${YELLOW}🐳 Установка Docker...${NC}"
if ! have_cmd docker; then
  mkdir -p /etc/apt/keyrings

  if is_ubuntu; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
      > /etc/apt/sources.list.d/docker.list
  elif is_debian; then
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
      > /etc/apt/sources.list.d/docker.list
  else
    echo -e "${RED}❌ Unsupported OS. Need Ubuntu/Debian.${NC}"
    exit 1
  fi

  apt update
  apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
else
  echo -e "${YELLOW}⚠ Docker уже установлен, пропускаю установку.${NC}"
fi

systemctl enable --now docker
DOCKER_VERSION="$(docker --version | awk '{print $3}' | sed 's/,//')"
COMPOSE_VERSION="$(docker compose version | awk '{print $4}')"
echo -e "${GREEN}✓ Docker ${DOCKER_VERSION} установлен${NC}"
echo -e "${GREEN}✓ Docker Compose ${COMPOSE_VERSION} установлен${NC}"
echo ""

echo -e "${YELLOW}🌐 Установка Nginx...${NC}"
apt-get install -y nginx
systemctl enable --now nginx
NGINX_VERSION="$(nginx -v 2>&1 | awk -F'/' '{print $2}')"
echo -e "${GREEN}✓ Nginx ${NGINX_VERSION} установлен${NC}"
echo ""

echo -e "${YELLOW}🔒 Установка Certbot...${NC}"
apt-get install -y certbot python3-certbot-nginx
echo -e "${GREEN}✓ Certbot установлен${NC}"
echo ""

# Освободить 5432 под docker postgres (compose публикует 5432:5432)
if systemctl list-unit-files | grep -q '^postgresql\.service'; then
  if systemctl is-active --quiet postgresql; then
    echo -e "${YELLOW}⚠ Обнаружен системный PostgreSQL. Останавливаю, чтобы освободить 5432 для Docker...${NC}"
    systemctl disable --now postgresql || true
    echo -e "${GREEN}✓ system PostgreSQL остановлен${NC}"
    echo ""
  fi
fi

echo "================================"
echo -e "${YELLOW}📦 Параметры деплоя${NC}"
echo "================================"
echo ""

read -p "Repo URL [${DEFAULT_REPO_URL}]: " REPO_URL
REPO_URL="${REPO_URL:-$DEFAULT_REPO_URL}"

read -p "Домен [${DEFAULT_DOMAIN}]: " DOMAIN
DOMAIN="${DOMAIN:-$DEFAULT_DOMAIN}"

read -p "Email для Let's Encrypt [${DEFAULT_LE_EMAIL}]: " LE_EMAIL
LE_EMAIL="${LE_EMAIL:-$DEFAULT_LE_EMAIL}"

read -p "SMTP user [${DEFAULT_SMTP_USER}]: " SMTP_USER
SMTP_USER="${SMTP_USER:-$DEFAULT_SMTP_USER}"

read -sp "SMTP App Password (обязательно для отправки писем): " SMTP_PASSWORD
echo ""

read -p "GTM/Analytics ID [${DEFAULT_GTM_ID}]: " GTM_ID
GTM_ID="${GTM_ID:-$DEFAULT_GTM_ID}"

PROJECT_DIR="/var/www/mi-era"
mkdir -p /var/www

echo -e "${YELLOW}📥 Клонирование/обновление репозитория...${NC}"
if [ -d "$PROJECT_DIR/.git" ]; then
  cd "$PROJECT_DIR"
  git pull
else
  if [ -d "$PROJECT_DIR" ]; then
    echo -e "${YELLOW}⚠ Директория $PROJECT_DIR существует, но не git repo.${NC}"
    read -p "Удалить и клонировать заново? (y/n): " RECLONE
    if [ "$RECLONE" = "y" ]; then
      rm -rf "$PROJECT_DIR"
      git clone "$REPO_URL" "$PROJECT_DIR"
    else
      echo -e "${RED}❌ Нужен git репозиторий в $PROJECT_DIR.${NC}"
      exit 1
    fi
  else
    git clone "$REPO_URL" "$PROJECT_DIR"
  fi
fi
echo -e "${GREEN}✓ Репозиторий готов${NC}"
echo ""

cd "$PROJECT_DIR"

if [ ! -f docker-compose.yml ] && [ ! -f compose.yml ]; then
  echo -e "${RED}❌ Не найден docker-compose.yml (или compose.yml) в $PROJECT_DIR.${NC}"
  exit 1
fi

echo -e "${YELLOW}⚙️  Генерация .env (Docker-friendly)...${NC}"
cat > .env <<ENVFILE
# Database (Docker internal host: postgres)
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/mi_era

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

# Analytics / Tag Manager
GOOGLE_ANALYTICS_ID=${GTM_ID}
ENVFILE
chmod 600 .env || true
echo -e "${GREEN}✓ .env создан${NC}"
echo ""

echo -e "${YELLOW}🐳 Поднимаю PostgreSQL...${NC}"
docker compose up -d postgres

echo -e "${YELLOW}⏳ Жду готовности PostgreSQL...${NC}"
for i in {1..30}; do
  if docker compose ps postgres | grep -q "Up"; then
    # если есть healthcheck — подождём healthy
    if docker inspect -f '{{.State.Health.Status}}' mi-era-postgres 2>/dev/null | grep -q "healthy"; then
      break
    fi
    # если healthcheck нет — достаточно, что Up
    if ! docker inspect -f '{{.State.Health.Status}}' mi-era-postgres >/dev/null 2>&1; then
      break
    fi
  fi
  sleep 2
done

if ! docker compose ps postgres | grep -q "Up"; then
  echo -e "${RED}❌ Postgres контейнер не поднялся.${NC}"
  docker compose logs --no-color postgres | tail -200
  exit 1
fi
echo -e "${GREEN}✓ PostgreSQL запущен${NC}"
echo ""

echo -e "${YELLOW}🐳 Сборка и запуск app...${NC}"
docker compose up -d --build app
echo -e "${GREEN}✓ App контейнер поднят${NC}"
echo ""

echo -e "${YELLOW}🗄️  Миграции drizzle внутри контейнера app...${NC}"
if docker compose exec -T app npm run | grep -q "db:push"; then
  docker compose exec -T app npm run db:push
else
  docker compose exec -T app npx drizzle-kit push
fi
echo -e "${GREEN}✓ Миграции применены${NC}"
echo ""

echo -e "${YELLOW}🌱 Seed (если есть)...${NC}"
if docker compose exec -T app npm run | grep -q "db:seed"; then
  docker compose exec -T app npm run db:seed
  echo -e "${GREEN}✓ Seed выполнен${NC}"
else
  echo -e "${YELLOW}⚠ Скрипт db:seed не найден — пропускаю.${NC}"
fi
echo ""

echo -e "${YELLOW}🌐 Настройка Nginx...${NC}"
cat > /etc/nginx/sites-available/mi-era <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/mi-era /etc/nginx/sites-enabled/mi-era
rm -f /etc/nginx/sites-enabled/default || true
nginx -t
systemctl reload nginx
echo -e "${GREEN}✓ Nginx настроен${NC}"
echo ""

echo -e "${YELLOW}🔒 Получаю SSL сертификат...${NC}"
certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" --non-interactive --agree-tos -m "${LE_EMAIL}" || {
  echo -e "${RED}❌ Certbot не смог выписать сертификат. Проверь DNS и доступность 80/443.${NC}"
  exit 1
}

(crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet") | crontab -
echo -e "${GREEN}✓ SSL включён + автообновление настроено${NC}"
echo ""

CONFIG_FILE="/root/mi-era-config.txt"
cat > "$CONFIG_FILE" <<EOF
Mi-Era Server Configuration
==========================
Created: $(date)

Project:
  Dir: ${PROJECT_DIR}
  Repo: ${REPO_URL}

Domain:
  ${DOMAIN}

Docker:
  Version: ${DOCKER_VERSION}
  Compose: ${COMPOSE_VERSION}

Nginx:
  Version: ${NGINX_VERSION}

Notes:
- App & Postgres run via docker compose.
- Logs:
    cd ${PROJECT_DIR}
    docker compose logs -f app
    docker compose logs -f postgres
- Migrations/Seed:
    docker compose exec app npm run db:push
    docker compose exec app npm run db:seed
EOF
chmod 600 "$CONFIG_FILE" || true

echo "================================"
echo -e "${GREEN}✅ Готово!${NC}"
echo "================================"
echo ""
echo "Сайт:"
echo "  https://${DOMAIN}"
echo "  https://www.${DOMAIN}"
echo ""
echo "Проверка:"
echo "  curl -I http://127.0.0.1:3000"
echo "  curl -I https://${DOMAIN}"
echo ""
echo -e "${YELLOW}📄 Конфиг: ${CONFIG_FILE}${NC}"
echo ""
