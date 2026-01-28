#!/bin/bash
# Server Setup (Docker-first, .env managed by GitHub Actions)
# Supported: Ubuntu 22.04/24.04, Debian 11/12

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "================================"
echo "Server Setup (Docker)"
echo "================================"
echo ""

if [ "${EUID:-0}" -ne 0 ]; then
  echo -e "${RED}❌ Please run as root:${NC} sudo bash server-setup.sh"
  exit 1
fi

have_cmd() { command -v "$1" >/dev/null 2>&1; }
is_ubuntu() { [ -f /etc/os-release ] && grep -qi 'ubuntu' /etc/os-release; }
is_debian() { [ -f /etc/os-release ] && grep -qi 'debian' /etc/os-release; }

if ! is_ubuntu && ! is_debian; then
  echo -e "${RED}❌ Unsupported OS. Please use Ubuntu or Debian.${NC}"
  exit 1
fi

echo -e "${YELLOW}This script will:${NC}"
echo "  - Update the system"
echo "  - Install Docker + Docker Compose plugin"
echo "  - Install and configure Nginx + Certbot (Let's Encrypt)"
echo "  - Clone/update the project repo into /var/www/<project-name>"
echo "  - Configure Nginx reverse proxy to the app on 127.0.0.1:3000"
echo "  - Obtain SSL certificates for your domain"
echo ""
echo -e "${YELLOW}Note:${NC} .env is NOT generated here. It will be created/updated by GitHub Actions from Secrets."
echo ""

read -p "Continue? (y/n): " CONTINUE
if [ "${CONTINUE}" != "y" ]; then
  echo "Cancelled."
  exit 0
fi
echo ""

# --- Ask inputs (no defaults) ---
read -p "Project name (used for /var/www/<name> and nginx site name): " PROJECT_NAME
if [ -z "${PROJECT_NAME}" ]; then
  echo -e "${RED}❌ Project name is required.${NC}"
  exit 1
fi

PROJECT_DIR="/var/www/${PROJECT_NAME}"
NGINX_SITE_NAME="${PROJECT_NAME}"
NGINX_SITE_PATH="/etc/nginx/sites-available/${NGINX_SITE_NAME}"
ENV_PATH="${PROJECT_DIR}/.env"

read -p "Git repo URL (HTTPS): " REPO_URL
if [ -z "${REPO_URL}" ]; then
  echo -e "${RED}❌ Repo URL is required.${NC}"
  exit 1
fi

read -p "Domain (e.g. mi-era.org): " DOMAIN
if [ -z "${DOMAIN}" ]; then
  echo -e "${RED}❌ Domain is required.${NC}"
  exit 1
fi

read -p "Let's Encrypt email: " LE_EMAIL
if [ -z "${LE_EMAIL}" ]; then
  echo -e "${RED}❌ Let's Encrypt email is required.${NC}"
  exit 1
fi

echo ""
echo -e "${YELLOW}Selected configuration:${NC}"
echo "  Project name: ${PROJECT_NAME}"
echo "  Project dir : ${PROJECT_DIR}"
echo "  Domain      : ${DOMAIN}"
echo "  Nginx site  : ${NGINX_SITE_NAME}"
echo ""

echo -e "${YELLOW}📦 Updating system packages...${NC}"
apt update
apt upgrade -y --fix-missing || true
echo -e "${GREEN}✓ System updated${NC}"
echo ""

echo -e "${YELLOW}📦 Installing base utilities...${NC}"
apt install -y curl wget git ufw ca-certificates gnupg lsb-release openssl
echo -e "${GREEN}✓ Base utilities installed${NC}"
echo ""

echo -e "${YELLOW}🔥 Configuring firewall (UFW)...${NC}"
ufw allow OpenSSH || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
echo "y" | ufw enable >/dev/null 2>&1 || true
echo -e "${GREEN}✓ Firewall configured${NC}"
echo ""

echo -e "${YELLOW}🐳 Installing Docker...${NC}"
if ! have_cmd docker; then
  mkdir -p /etc/apt/keyrings

  if is_ubuntu; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
      > /etc/apt/sources.list.d/docker.list
  else
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
      > /etc/apt/sources.list.d/docker.list
  fi

  apt update
  apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
else
  echo -e "${YELLOW}⚠ Docker is already installed. Skipping.${NC}"
fi

systemctl enable --now docker
DOCKER_VERSION="$(docker --version | awk '{print $3}' | sed 's/,//')"
COMPOSE_VERSION="$(docker compose version | awk '{print $4}')"
echo -e "${GREEN}✓ Docker ${DOCKER_VERSION} installed${NC}"
echo -e "${GREEN}✓ Docker Compose ${COMPOSE_VERSION} installed${NC}"
echo ""

echo -e "${YELLOW}🌐 Installing Nginx...${NC}"
apt-get install -y nginx
systemctl enable --now nginx
NGINX_VERSION="$(nginx -v 2>&1 | awk -F'/' '{print $2}')"
echo -e "${GREEN}✓ Nginx ${NGINX_VERSION} installed${NC}"
echo ""

echo -e "${YELLOW}🔒 Installing Certbot...${NC}"
apt-get install -y certbot python3-certbot-nginx
echo -e "${GREEN}✓ Certbot installed${NC}"
echo ""

# If system PostgreSQL exists, stop it to avoid port conflicts in case you bind 5432 locally
if systemctl list-unit-files | grep -q '^postgresql\.service'; then
  if systemctl is-active --quiet postgresql; then
    echo -e "${YELLOW}⚠ System PostgreSQL detected. Stopping it to avoid port conflicts...${NC}"
    systemctl disable --now postgresql || true
    echo -e "${GREEN}✓ System PostgreSQL stopped${NC}"
    echo ""
  fi
fi

echo -e "${YELLOW}📁 Preparing project directory...${NC}"
mkdir -p /var/www

echo -e "${YELLOW}📥 Cloning/updating repository...${NC}"
if [ -d "${PROJECT_DIR}/.git" ]; then
  cd "${PROJECT_DIR}"
  git fetch --all
  git reset --hard origin/main || true
  git pull || true
else
  if [ -d "${PROJECT_DIR}" ] && [ "$(ls -A "${PROJECT_DIR}" 2>/dev/null | wc -l)" -gt 0 ]; then
    echo -e "${YELLOW}⚠ ${PROJECT_DIR} exists and is not a git repo (or not empty).${NC}"
    read -p "Delete it and re-clone? (y/n): " RECLONE
    if [ "${RECLONE}" = "y" ]; then
      rm -rf "${PROJECT_DIR}"
      git clone "${REPO_URL}" "${PROJECT_DIR}"
    else
      echo -e "${RED}❌ Cannot proceed without a clean git repo in ${PROJECT_DIR}.${NC}"
      exit 1
    fi
  else
    rm -rf "${PROJECT_DIR}" || true
    git clone "${REPO_URL}" "${PROJECT_DIR}"
  fi
fi
echo -e "${GREEN}✓ Repository is ready${NC}"
echo ""

cd "${PROJECT_DIR}"

# Detect compose file
if [ -f docker-compose.yml ]; then
  COMPOSE_FILE="docker-compose.yml"
elif [ -f compose.yml ]; then
  COMPOSE_FILE="compose.yml"
else
  echo -e "${RED}❌ No docker-compose.yml (or compose.yml) found in ${PROJECT_DIR}.${NC}"
  exit 1
fi

echo -e "${YELLOW}🌐 Configuring Nginx reverse proxy (HTTP)...${NC}"
cat > "${NGINX_SITE_PATH}" <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Increase upload limit (adjust as needed)
    client_max_body_size 50M;

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

ln -sf "${NGINX_SITE_PATH}" "/etc/nginx/sites-enabled/${NGINX_SITE_NAME}"
rm -f /etc/nginx/sites-enabled/default || true

nginx -t
systemctl reload nginx
echo -e "${GREEN}✓ Nginx configured${NC}"
echo ""

echo -e "${YELLOW}🔒 Obtaining SSL certificate via Certbot...${NC}"
certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" --non-interactive --agree-tos -m "${LE_EMAIL}" || {
  echo -e "${RED}❌ Certbot failed. Check DNS A records and that ports 80/443 are reachable.${NC}"
  exit 1
}

(crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet") | crontab -
echo -e "${GREEN}✓ SSL enabled + auto-renew configured${NC}"
echo ""

# --- Optional: start services only if .env exists ---
echo -e "${YELLOW}🐳 Docker Compose bootstrap (optional)...${NC}"
if [ -f "${ENV_PATH}" ]; then
  echo -e "${GREEN}✓ Found ${ENV_PATH}. Starting services...${NC}"
  docker compose up -d postgres || true

  echo -e "${YELLOW}⏳ Waiting for Postgres health...${NC}"
  for i in {1..30}; do
    if docker compose ps postgres | grep -q "Up"; then
      PG_CID="$(docker compose ps -q postgres 2>/dev/null || true)"
      if [ -n "${PG_CID}" ]; then
        PG_HEALTH="$(docker inspect -f '{{.State.Health.Status}}' "${PG_CID}" 2>/dev/null || true)"
        if [ "${PG_HEALTH}" = "healthy" ] || [ -z "${PG_HEALTH}" ]; then
          break
        fi
      else
        break
      fi
    fi
    sleep 2
  done

  docker compose up -d --build app

  echo -e "${YELLOW}🗄️ Running migrations (Drizzle) inside app...${NC}"
  if docker compose exec -T app npm run | grep -q "db:push"; then
    docker compose exec -T app npm run db:push
  else
    docker compose exec -T app npx drizzle-kit push
  fi
  echo -e "${GREEN}✓ Migrations applied${NC}"

  echo -e "${YELLOW}🌱 Running seed (if available)...${NC}"
  if docker compose exec -T app npm run | grep -q "db:seed"; then
    docker compose exec -T app npm run db:seed || true
    echo -e "${GREEN}✓ Seed done${NC}"
  else
    echo -e "${YELLOW}⚠ No db:seed script found. Skipping.${NC}"
  fi

  echo ""
  docker compose ps
  docker compose logs --tail=40 app || true
else
  echo -e "${YELLOW}⚠ ${ENV_PATH} not found.${NC}"
  echo "Server setup is complete, but the application was NOT started."
  echo ""
  echo "Next step:"
  echo "  - Run your GitHub Actions deploy (it will create/update .env from Secrets)"
  echo "  - Or manually create ${ENV_PATH} and run:"
  echo "      cd ${PROJECT_DIR} && docker compose up -d --build"
fi

CONFIG_FILE="/root/${PROJECT_NAME}-config.txt"
cat > "${CONFIG_FILE}" <<EOF
Server Configuration
====================
Created: $(date)

Project:
  Name: ${PROJECT_NAME}
  Dir: ${PROJECT_DIR}
  Repo: ${REPO_URL}

Domain:
  ${DOMAIN}

Docker:
  Version: ${DOCKER_VERSION}
  Compose: ${COMPOSE_VERSION}

Nginx:
  Version: ${NGINX_VERSION}
  Site: ${NGINX_SITE_PATH}

Notes:
- .env is managed by GitHub Actions (from Secrets), not by this script.
- Logs:
    cd ${PROJECT_DIR}
    docker compose logs -f app
    docker compose logs -f postgres
EOF
chmod 600 "${CONFIG_FILE}" || true

echo ""
echo "================================"
echo -e "${GREEN}✅ Done!${NC}"
echo "================================"
echo ""
echo "Website:"
echo "  https://${DOMAIN}"
echo "  https://www.${DOMAIN}"
echo ""
echo "Project directory:"
echo "  ${PROJECT_DIR}"
echo ""
echo "Useful checks:"
echo "  curl -I http://127.0.0.1:3000   (if app is running)"
echo "  curl -I https://${DOMAIN}"
echo ""
echo -e "${YELLOW}Config saved to:${NC} ${CONFIG_FILE}"
echo ""
