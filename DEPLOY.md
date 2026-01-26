# Deployment Guide

## Полная настройка сервера с нуля

Инструкция для чистого Ubuntu 22.04/24.04 или Debian 11/12 сервера.

### Шаг 1: Первоначальная настройка сервера

#### 1.1 Подключение к серверу

```bash
ssh root@your-server-ip
```

#### 1.2 Обновление системы

```bash
apt update && apt upgrade -y
```

#### 1.3 Создание пользователя (не root)

```bash
adduser deploy
usermod -aG sudo deploy
```

#### 1.4 Настройка SSH для нового пользователя

```bash
# Копируем SSH ключи от root к deploy
mkdir -p /home/deploy/.ssh
cp /root/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

Проверить подключение:
```bash
# На локальной машине
ssh deploy@your-server-ip
```

#### 1.5 Настройка Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

### Шаг 2: Установка зависимостей

#### 2.1 Node.js (v20 LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Проверка
npm --version
```

#### 2.2 PM2

```bash
sudo npm install -g pm2
pm2 --version
```

#### 2.3 PostgreSQL

```bash
sudo apt-get install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql
```

#### 2.4 Git

```bash
sudo apt-get install -y git
git --version
```

#### 2.5 Nginx

```bash
sudo apt-get install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

### Шаг 3: Настройка PostgreSQL

#### 3.1 Создание базы данных и пользователя

```bash
sudo -u postgres psql
```

В PostgreSQL консоли:
```sql
CREATE DATABASE mi_era;
CREATE USER mi_era_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE mi_era TO mi_era_user;
\q
```

#### 3.2 Проверка подключения

```bash
psql -U mi_era_user -d mi_era -h localhost
# Ввести пароль
\q
```

### Шаг 4: Клонирование и настройка проекта

#### 4.1 Создание директории

```bash
sudo mkdir -p /var/www
sudo chown -R deploy:deploy /var/www
cd /var/www
```

#### 4.2 Настройка SSH для GitHub (если приватный репозиторий)

```bash
ssh-keygen -t ed25519 -C "deploy@your-server"
cat ~/.ssh/id_ed25519.pub
# Добавить этот ключ в GitHub: Settings → SSH and GPG keys → New SSH key
```

#### 4.3 Клонирование репозитория

```bash
cd /var/www
git clone git@github.com:your-username/mi-era.git
# Или для публичного репозитория:
# git clone https://github.com/your-username/mi-era.git

cd mi-era
```

#### 4.4 Создание .env файла

```bash
nano .env
```

Содержимое `.env`:
```env
# Database
DATABASE_URL=postgresql://mi_era_user:your_secure_password@localhost:5432/mi_era

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=no-reply@mi-era.org

# Application
BASE_URL=https://your-domain.com
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NODE_ENV=production

# Analytics (optional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

Сохранить: `Ctrl+X`, `Y`, `Enter`

#### 4.5 Установка зависимостей и миграции

```bash
npm install
npm run db:push  # Применить схему БД
npm run db:seed  # Заполнить статические страницы (если есть)
```

#### 4.6 Build проекта

```bash
npm run build
```

### Шаг 5: Запуск приложения с PM2

```bash
pm2 start npm --name "mi-era" -- start
pm2 save
pm2 startup
# Выполнить команду, которую выведет pm2 startup
```

Проверка:
```bash
pm2 status
pm2 logs mi-era
curl http://localhost:3000
```

### Шаг 6: Настройка Nginx

#### 6.1 Создание конфигурации

```bash
sudo nano /etc/nginx/sites-available/mi-era
```

Содержимое:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 6.2 Активация конфигурации

```bash
sudo ln -s /etc/nginx/sites-available/mi-era /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Шаг 7: SSL сертификат (Let's Encrypt)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Следовать инструкциям certbot. Автоматическое обновление:
```bash
sudo certbot renew --dry-run
```

### Шаг 8: Настройка GitHub Actions

#### 8.1 Генерация SSH ключа для GitHub Actions

На **локальной машине**:
```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github-actions
```

#### 8.2 Добавление публичного ключа на сервер

```bash
# На локальной машине
cat ~/.ssh/github-actions.pub

# На сервере
nano ~/.ssh/authorized_keys
# Вставить публичный ключ в новую строку
```

#### 8.3 Добавление секретов в GitHub

Перейти в GitHub: `Settings → Secrets and variables → Actions → New repository secret`

Добавить 4 секрета:

1. **SSH_HOST**: IP адрес сервера (например: `123.45.67.89`)
2. **SSH_USER**: `deploy`
3. **SSH_KEY**: содержимое `~/.ssh/github-actions` (приватный ключ)
4. **SSH_PORT**: `22`

### Шаг 9: Проверка деплоя

```bash
# Сделать коммит и пуш в main
git add .
git commit -m "Test deploy"
git push origin main
```

Проверить:
1. GitHub → Actions → Проверить статус workflow
2. Открыть сайт: `https://your-domain.com`

---

## GitHub Actions Auto-Deploy Setup

Этот проект настроен на автоматический деплой на сервер при пуше в `main` ветку.

### Требования на сервере

1. **Node.js** (v18+)
2. **npm** или **pnpm**
3. **PM2** для управления процессом
4. **PostgreSQL** для базы данных
5. **Git** для клонирования репозитория

### Настройка сервера

#### 1. Установка зависимостей

```bash
# Node.js (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2
sudo npm install -g pm2

# PostgreSQL
sudo apt-get install postgresql postgresql-contrib
```

#### 2. Клонирование репозитория

```bash
cd /var/www
sudo git clone https://github.com/your-username/mi-era.git
sudo chown -R $USER:$USER mi-era
cd mi-era
```

#### 3. Настройка окружения

```bash
# Создать .env файл
cp .env.example .env
nano .env
```

Заполнить переменные окружения:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/mi_era
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
BASE_URL=https://your-domain.com
NODE_ENV=production
```

#### 4. Установка и запуск

```bash
npm install
npm run build
pm2 start npm --name "mi-era" -- start
pm2 save
pm2 startup
```

### Настройка GitHub Secrets

В настройках репозитория GitHub (Settings → Secrets and variables → Actions) добавить:

1. **SSH_HOST** - IP адрес или домен сервера (например: `123.45.67.89`)
2. **SSH_USER** - пользователь SSH (обычно `deploy`)
3. **SSH_KEY** - приватный SSH ключ (см. инструкцию ниже)
4. **SSH_PORT** - порт SSH (обычно `22`)

#### Генерация и настройка SSH ключа для GitHub Actions

**На локальной машине:**

```bash
# Генерация нового SSH ключа специально для GitHub Actions
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github-actions-deploy -N ""

# Это создаст два файла:
# ~/.ssh/github-actions-deploy (приватный ключ)
# ~/.ssh/github-actions-deploy.pub (публичный ключ)
```

**Добавление публичного ключа на сервер:**

```bash
# Скопировать публичный ключ на сервер
ssh-copy-id -i ~/.ssh/github-actions-deploy.pub deploy@your-server-ip

# Или вручную:
cat ~/.ssh/github-actions-deploy.pub
# Скопировать вывод и добавить в /home/deploy/.ssh/authorized_keys на сервере
```

**Проверка подключения:**

```bash
ssh -i ~/.ssh/github-actions-deploy deploy@your-server-ip
```

**Добавление приватного ключа в GitHub Secret:**

```bash
# Вывести приватный ключ
cat ~/.ssh/github-actions-deploy

# Скопировать ВЕСЬ вывод, включая строки:
# -----BEGIN OPENSSH PRIVATE KEY-----
# ...содержимое ключа...
# -----END OPENSSH PRIVATE KEY-----
```

В GitHub:
1. Перейти в `Settings → Secrets and variables → Actions`
2. Нажать `New repository secret`
3. Name: `SSH_KEY`
4. Value: Вставить **весь** скопированный приватный ключ (включая BEGIN и END строки)
5. Нажать `Add secret`

**ВАЖНО:** 
- Ключ должен быть вставлен полностью, со всеми переносами строк
- Не должно быть лишних пробелов в начале или конце
- Формат должен быть точно как в файле

#### Альтернатива: использование существующего ключа

Если у вас уже есть SSH ключ на сервере:

```bash
# На локальной машине
cat ~/.ssh/id_ed25519  # или ~/.ssh/id_rsa

# Скопировать весь вывод и добавить в GitHub Secret SSH_KEY
```

### Nginx конфигурация (опционально)

Если используется Nginx как reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Активировать конфигурацию:
```bash
sudo ln -s /etc/nginx/sites-available/mi-era /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL сертификат (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Проверка деплоя

После пуша в `main` ветку:

1. Перейти в GitHub → Actions
2. Проверить статус workflow
3. Проверить сайт: `https://your-domain.com`

### Полезные команды PM2

```bash
# Просмотр логов
pm2 logs mi-era

# Перезапуск
pm2 restart mi-era

# Остановка
pm2 stop mi-era

# Статус
pm2 status

# Мониторинг
pm2 monit
```

### Troubleshooting

**Проблема:** Деплой не запускается
- Проверить GitHub Secrets
- Проверить SSH доступ: `ssh user@server`

**Проблема:** Build падает
- Проверить логи: `pm2 logs mi-era`
- Проверить переменные окружения в `.env`

**Проблема:** База данных не подключается
- Проверить PostgreSQL: `sudo systemctl status postgresql`
- Проверить DATABASE_URL в `.env`
