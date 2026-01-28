# Mi-Era

Production deployment with **Docker Compose** and **GitHub Actions**.  
Secrets are stored only in **GitHub Secrets**; `.env` is generated on deploy.

---

## Stack

- Next.js (app)
- PostgreSQL 16 (database)
- Docker + Docker Compose
- Nginx + Let's Encrypt (Certbot)
- GitHub Actions for deployment

---

## Server layout

Project is deployed to:

/var/www/<PROJECT_NAME>


Example:


/var/www/mi-era


---

## Docker services

### `app`
- Next.js production container
- Runs on `127.0.0.1:3000` (Nginx proxies to it)

### `postgres`
- PostgreSQL 16 in Docker
- Data stored in a persistent Docker volume
- Not exposed publicly

---

## Uploads / media

Uploads are persisted via a Docker volume mounted to:

/app/public/uploads


---

## Environment / Secrets

### Important
- `.env` is **not committed** to the repository
- `.env` is generated automatically on every deploy by **GitHub Actions**
- Values come from **GitHub Secrets**

### Required GitHub Secrets

#### Project
- `PROJECT_NAME` (e.g. `mi-era`)
- `DOMAIN` (e.g. `mi-era.org`)

#### Database
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`

`DATABASE_URL` is generated automatically as:

postgresql://POSTGRES_USER:POSTGRES_PASSWORD@postgres:5432/POSTGRES_DB


#### SMTP (email)
- `SMTP_HOST` (e.g. `smtp.gmail.com`)
- `SMTP_PORT` (e.g. `587`)
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`

#### Admin
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

#### Analytics (optional)
- `GOOGLE_ANALYTICS_ID`

#### SSH (deployment)
- `SSH_HOST`
- `SSH_USER`
- `SSH_PORT`
- `SSH_KEY`
- `SSH_PASSPHRASE` (only if the SSH key is encrypted)

---

## Deployment

Deploy runs on every push to `main`:

1. SSH into the server
2. Pull latest code
3. Generate `.env` from GitHub Secrets
4. Start Postgres (if not running)
5. Build and recreate the `app` container
6. Run migrations + optional seed

---

## Useful commands (on server)

```bash
cd /var/www/mi-era

docker compose ps
docker compose logs -f app
docker compose logs -f postgres
