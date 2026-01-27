# Fix 413 Request Entity Too Large Error

## Problem
Nginx returns 413 error when uploading images larger than 1MB (default nginx limit).

## Solution
Add `client_max_body_size 10M;` to nginx configuration.

## Manual Fix (if already deployed)

SSH into your server and run:

```bash
# Edit nginx config
sudo nano /etc/nginx/sites-available/mi-era

# Add this line inside the server block (after server_name):
client_max_body_size 10M;

# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### Complete server block should look like:

```nginx
server {
    listen 80;
    server_name mi-era.org www.mi-era.org;

    # Allow larger file uploads (for images in admin)
    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass $http_upgrade;
    }
}
```

## For New Deployments

The updated `scripts/server-setup.sh` now includes this fix automatically.

## Verification

After applying the fix, test by uploading an image in the admin panel.
