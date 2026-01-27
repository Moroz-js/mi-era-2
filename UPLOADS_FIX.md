# Fix Uploads 404 Error

## Problem
Files upload successfully but return 404 when accessed via URL.

## Root Cause
The `public/uploads/` directory is not persisted as a Docker volume, so files are lost or not accessible.

## Solution Applied
Added volume mount in `docker-compose.yml` for persistent uploads storage.

## Deployment Steps

### 1. SSH into server
```bash
ssh root@your-server
cd /var/www/mi-era
```

### 2. Pull latest changes
```bash
git pull
```

### 3. Backup existing uploads (if any)
```bash
# Check if there are any files to backup
docker exec mi-era-app ls -la /app/public/uploads/ || echo "No uploads directory"

# If files exist, backup them
docker cp mi-era-app:/app/public/uploads ./uploads-backup || true
```

### 4. Recreate app container with new volume
```bash
# Stop and remove app container
docker compose down app

# Rebuild and start with new volume mount
docker compose up -d --build app
```

### 5. Restore backed up files (if any)
```bash
# Wait for container to be ready
sleep 5

# Create uploads directory in container if it doesn't exist
docker exec mi-era-app mkdir -p /app/public/uploads

# Copy backed up files back
if [ -d "./uploads-backup" ]; then
  docker cp ./uploads-backup/. mi-era-app:/app/public/uploads/
  echo "Uploads restored"
fi
```

### 6. Set proper permissions
```bash
docker exec mi-era-app chmod -R 755 /app/public/uploads
```

### 7. Verify
```bash
# Check if uploads directory exists and is writable
docker exec mi-era-app ls -la /app/public/uploads/

# Check volume mount
docker inspect mi-era-app | grep -A 10 Mounts
```

### 8. Test upload
Go to admin panel and upload a test image. The URL should now work.

## Verification Checklist

- [ ] Container restarted with new docker-compose.yml
- [ ] Volume `uploads_data` created: `docker volume ls | grep uploads`
- [ ] Directory exists in container: `docker exec mi-era-app ls /app/public/uploads`
- [ ] Test upload works and file is accessible via URL
- [ ] After container restart, uploaded files still exist

## Troubleshooting

### Files still return 404
```bash
# Check if file actually exists in container
docker exec mi-era-app ls -la /app/public/uploads/

# Check Next.js logs
docker compose logs -f app

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Permission issues
```bash
# Fix permissions
docker exec mi-era-app chown -R node:node /app/public/uploads
docker exec mi-era-app chmod -R 755 /app/public/uploads
```

### Volume not mounting
```bash
# Check volume exists
docker volume ls

# Inspect volume
docker volume inspect uploads_data

# Remove and recreate if needed
docker compose down
docker volume rm uploads_data
docker compose up -d
```
