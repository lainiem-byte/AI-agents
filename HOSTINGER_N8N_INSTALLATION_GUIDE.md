# Installing n8n on Hostinger VPS - Complete Guide

## Overview
This guide will walk you through installing n8n on your Hostinger VPS and securing it with SSL.

---

## 🎯 PREREQUISITES

### What You Need:
- ✅ Hostinger VPS with Ubuntu 20.04 or 22.04 (recommended)
- ✅ Root or sudo access via SSH
- ✅ Domain or subdomain pointing to your VPS (e.g., n8n.lnlgroup.com)
- ✅ Basic terminal/command line familiarity

### Recommended VPS Specs:
- **Minimum:** 2GB RAM, 1 CPU, 20GB storage
- **Recommended:** 4GB RAM, 2 CPU, 40GB storage (for production)

---

## 📝 STEP 1: CONNECT TO YOUR VPS

### Via SSH:

```bash
ssh root@your-vps-ip-address
# OR
ssh username@your-vps-ip-address
```

**Enter your password when prompted.**

---

## 🔧 STEP 2: UPDATE SYSTEM

```bash
# Update package lists
sudo apt update

# Upgrade installed packages
sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git build-essential
```

---

## 📦 STEP 3: INSTALL NODE.JS

n8n requires Node.js. Install the LTS version:

```bash
# Install Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x or higher
```

---

## ⚙️ STEP 4: INSTALL N8N

### Option A: Install Globally (Recommended for Production)

```bash
# Install n8n globally
sudo npm install -g n8n

# Verify installation
n8n --version
```

### Option B: Install with PM2 (For Always-On Operation)

```bash
# Install PM2 process manager
sudo npm install -g pm2

# Install n8n
sudo npm install -g n8n

# Start n8n with PM2
pm2 start n8n

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
# Follow the command it outputs
```

---

## 🌐 STEP 5: CONFIGURE N8N

### Create n8n Configuration Directory:

```bash
# Create directory for n8n data
mkdir -p ~/.n8n

# Create environment configuration file
nano ~/.n8n/.env
```

### Add This Configuration:

```bash
# n8n Configuration
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=your_username
N8N_BASIC_AUTH_PASSWORD=your_strong_password

# Webhook URL (update with your domain)
WEBHOOK_URL=https://n8n.lnlgroup.com/

# Database (optional - uses SQLite by default)
# For production, consider PostgreSQL
# DB_TYPE=postgresdb
# DB_POSTGRESDB_HOST=localhost
# DB_POSTGRESDB_PORT=5432
# DB_POSTGRESDB_DATABASE=n8n
# DB_POSTGRESDB_USER=n8n_user
# DB_POSTGRESDB_PASSWORD=your_db_password

# Timezone
GENERIC_TIMEZONE=America/New_York

# Execution mode
EXECUTIONS_PROCESS=main

# Security
N8N_SECURE_COOKIE=true
```

**Save and exit:** Press `Ctrl+X`, then `Y`, then `Enter`

---

## 🔐 STEP 6: SET UP DOMAIN & SSL

### 6.1: Point Domain to VPS

In your domain registrar (GoDaddy, Namecheap, etc.):

```
Type: A
Name: n8n
Value: [Your VPS IP Address]
TTL: 3600
```

**Wait 5-60 minutes for DNS propagation.**

### 6.2: Install Nginx (Reverse Proxy)

```bash
# Install Nginx
sudo apt install -y nginx

# Create n8n configuration
sudo nano /etc/nginx/sites-available/n8n
```

**Paste this configuration:**

```nginx
server {
    listen 80;
    server_name n8n.lnlgroup.com;  # Change to your domain

    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # WebSocket support
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Save and exit:** `Ctrl+X`, `Y`, `Enter`

### 6.3: Enable Configuration

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 6.4: Install SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d n8n.lnlgroup.com

# Follow prompts:
# - Enter your email
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)

# Set up auto-renewal
sudo certbot renew --dry-run
```

---

## 🚀 STEP 7: START N8N

### If Using PM2 (Recommended):

```bash
# Stop existing n8n if running
pm2 stop n8n

# Start n8n with environment file
pm2 start n8n -- start

# Save PM2 configuration
pm2 save

# Check status
pm2 status
pm2 logs n8n  # View logs
```

### If Running Directly:

```bash
# Start n8n
n8n start
```

---

## ✅ STEP 8: ACCESS N8N

### Open Your Browser:

```
https://n8n.lnlgroup.com
```

**You should see the n8n login page!**

### First Login:
- Username: (what you set in N8N_BASIC_AUTH_USER)
- Password: (what you set in N8N_BASIC_AUTH_PASSWORD)

---

## 🔧 STEP 9: CONFIGURE N8N SETTINGS

### In n8n Interface:

1. **Go to Settings** (gear icon)
2. **General Settings:**
   - Timezone: America/New_York (or your timezone)
   - Instance ID: (auto-generated)
3. **Save**

---

## 📊 STEP 10: VERIFY WEBHOOK URLS

### Create a Test Webhook:

1. **Create new workflow**
2. **Add Webhook node**
3. **Configure:**
   - HTTP Method: GET
   - Path: test
4. **Activate workflow**
5. **Copy the Production URL**

**Should look like:**
```
https://n8n.lnlgroup.com/webhook/test
```

**Test it in browser - should return webhook response!**

---

## 🛡️ SECURITY BEST PRACTICES

### 1. Firewall Configuration

```bash
# Install UFW (if not already installed)
sudo apt install -y ufw

# Allow SSH (IMPORTANT - don't lock yourself out!)
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### 2. Change SSH Port (Optional but Recommended)

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Find line: #Port 22
# Change to: Port 2222 (or any port you choose)

# Restart SSH
sudo systemctl restart sshd

# BEFORE closing this session, test new port in another terminal:
ssh -p 2222 root@your-vps-ip

# Update firewall:
sudo ufw allow 2222/tcp
sudo ufw delete allow 22/tcp
```

### 3. Keep System Updated

```bash
# Create update script
nano ~/update-system.sh
```

**Paste:**
```bash
#!/bin/bash
apt update
apt upgrade -y
apt autoremove -y
pm2 update
npm update -g n8n
```

**Make executable:**
```bash
chmod +x ~/update-system.sh

# Run weekly
sudo crontab -e
# Add: 0 3 * * 0 /root/update-system.sh
```

---

## 🔄 MAINTENANCE COMMANDS

### Check n8n Status:
```bash
pm2 status
pm2 logs n8n
```

### Restart n8n:
```bash
pm2 restart n8n
```

### Update n8n:
```bash
npm update -g n8n
pm2 restart n8n
```

### View n8n Logs:
```bash
pm2 logs n8n --lines 100
```

### Stop n8n:
```bash
pm2 stop n8n
```

---

## 📦 BACKUP CONFIGURATION

### Backup n8n Data:

```bash
# Create backup script
nano ~/backup-n8n.sh
```

**Paste:**
```bash
#!/bin/bash
BACKUP_DIR="/root/n8n-backups"
DATE=$(date +%Y%m%d-%H%M%S)

mkdir -p $BACKUP_DIR

# Backup n8n data
tar -czf $BACKUP_DIR/n8n-data-$DATE.tar.gz ~/.n8n

# Keep only last 7 backups
ls -t $BACKUP_DIR/n8n-data-*.tar.gz | tail -n +8 | xargs rm -f

echo "Backup completed: n8n-data-$DATE.tar.gz"
```

**Make executable and schedule:**
```bash
chmod +x ~/backup-n8n.sh

# Run daily at 2 AM
crontab -e
# Add: 0 2 * * * /root/backup-n8n.sh
```

---

## 🚨 TROUBLESHOOTING

### Issue: Can't Access n8n

**Check n8n is running:**
```bash
pm2 status
```

**Check Nginx:**
```bash
sudo systemctl status nginx
sudo nginx -t
```

**Check SSL:**
```bash
sudo certbot certificates
```

**Check DNS:**
```bash
nslookup n8n.lnlgroup.com
```

---

### Issue: Webhook URLs Not Working

**Check n8n webhook URL config:**
```bash
nano ~/.n8n/.env
# Verify WEBHOOK_URL is set correctly
```

**Restart n8n:**
```bash
pm2 restart n8n
```

---

### Issue: Out of Memory

**Check memory usage:**
```bash
free -h
```

**Increase VPS RAM if needed, or optimize:**
```bash
# Limit n8n memory
pm2 start n8n --max-memory-restart 1G
```

---

## 📊 MONITORING (OPTIONAL)

### Install PM2 Web Dashboard:

```bash
# Install pm2-server-monit
pm2 install pm2-server-monit

# Access at: http://your-vps-ip:9615
```

---

## ✅ POST-INSTALLATION CHECKLIST

- [ ] n8n accessible at https://n8n.lnlgroup.com
- [ ] SSL certificate installed and valid
- [ ] Basic auth working (username/password)
- [ ] PM2 auto-starts n8n on server reboot
- [ ] Firewall configured
- [ ] Webhook URLs working
- [ ] Backup script scheduled
- [ ] System update script scheduled

---

## 🎯 NEXT STEPS

Once n8n is installed and accessible:

1. ✅ **Import Concierge Agent workflow**
2. ✅ **Import Personal Assistant workflow**
3. ✅ **Add credentials** (Notion, Google Sheets, SMTP)
4. ✅ **Add 2 new webhooks** to Concierge workflow
5. ✅ **Get webhook URLs** for vault integration
6. ✅ **Test workflows**

---

## 📞 USEFUL COMMANDS REFERENCE

```bash
# Start n8n
pm2 start n8n

# Stop n8n
pm2 stop n8n

# Restart n8n
pm2 restart n8n

# View logs
pm2 logs n8n

# Check status
pm2 status

# Update n8n
npm update -g n8n && pm2 restart n8n

# Check Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# View SSL certificates
sudo certbot certificates

# Renew SSL (manual)
sudo certbot renew

# View firewall status
sudo ufw status
```

---

Your self-hosted n8n is now ready for the LNL Mechanical Heart! 🏛️⚙️
