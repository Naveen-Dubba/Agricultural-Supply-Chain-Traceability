# System Requirements & Setup Instructions

## Minimum System Requirements

### Hardware
- **CPU**: 2 cores minimum (4+ recommended)
- **RAM**: 4 GB minimum (8 GB recommended)
- **Storage**: 10 GB for application and database
- **Network**: Internet connection required

### Operating System
- Windows 10+ (with WSL2 or Docker Desktop)
- macOS 10.14+
- Linux (Ubuntu 18.04+, CentOS 7+, Debian 9+)

## Software Prerequisites

### Required
1. **Docker**
   - Version: 20.10+
   - Download: https://www.docker.com/products/docker-desktop
   
2. **Docker Compose**
   - Version: 1.29+ (included with Docker Desktop)

### Alternative (Local Development)
- Node.js 18+ with npm
- MySQL 8.0
- Git

## Installation

### Windows Setup

#### Option 1: Docker Desktop (Recommended)
```powershell
# 1. Download Docker Desktop from:
# https://www.docker.com/products/docker-desktop

# 2. Install and restart computer

# 3. Verify installation
docker --version
docker-compose --version

# 4. Navigate to project and start
cd C:\Users\YourUsername\Desktop\SE\agritrace
docker-compose up --build
```

#### Option 2: Local Development
```powershell
# Install Node.js from https://nodejs.org/
# Install MySQL from https://dev.mysql.com/downloads/mysql/

# Verify installations
node --version
npm --version
mysql --version

# Backend
cd agritrace\backend
npm install
npm start

# Frontend (new terminal)
cd agritrace\frontend
npm install
npm run dev
```

### macOS Setup

#### Option 1: Docker Desktop
```bash
# Install via Homebrew
brew install --cask docker

# Or download from https://www.docker.com/products/docker-desktop

# Start Docker Desktop and verify
docker --version
docker-compose --version

# Navigate and start
cd ~/Desktop/SE/agritrace
docker-compose up --build
```

#### Option 2: Local Development
```bash
# Install Node.js
brew install node

# Install MySQL
brew install mysql@8.0

# Verify
node --version
npm --version
mysql --version

# Run services
# Backend: npm start in backend/
# Frontend: npm run dev in frontend/
```

### Linux Setup (Ubuntu/Debian)

#### Option 1: Docker Compose
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker --version
docker-compose --version

# Add user to docker group (optional)
sudo usermod -aG docker $USER

# Run application
cd ~/Desktop/SE/agritrace
docker-compose up --build
```

#### Option 2: Local Development
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
sudo apt-get install -y mysql-server

# Verify
node --version
npm --version
mysql --version

# Start services
service mysql start
npm start  # in backend/
npm run dev  # in frontend/
```

## Environment Configuration

### Create Backend .env
```bash
cd backend
cp .env.example .env
```

**Edit backend/.env:**
```
PORT=5000
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=agritrace_password
DB_NAME=agritrace
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

### Create Frontend .env
```bash
cd frontend
cp .env.example .env
```

**Edit frontend/.env:**
```
VITE_API_URL=http://localhost/api
```

## Verify Installation

### Docker Verification
```bash
# All services running
docker-compose ps

# All containers should show "Up" status

# Check logs
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

### Application Access
```
Frontend: http://localhost
Backend: http://localhost/api
Database: localhost:3306
MySQL: mysql -u root -p
```

### Database Connection Test
```bash
# From terminal
mysql -h localhost -u root -pagritrace_password agritrace

# Or from container
docker-compose exec mysql mysql -u root -pagritrace_password agritrace

# List tables
SHOW TABLES;

# Exit
EXIT;
```

## Performance Tuning

### Docker Resources (Edit docker-compose.yml)
```yaml
backend:
  deploy:
    resources:
      limits:
        cpus: '0.5'
        memory: 512M
```

### MySQL Performance
```sql
-- Increase InnoDB buffer pool
SET GLOBAL innodb_buffer_pool_size = 1073741824;

-- Optimize tables
OPTIMIZE TABLE produce_batches;
OPTIMIZE TABLE shipments;
```

### Frontend Optimization
```bash
# Production build
cd frontend
npm run build

# Creates optimized dist/ folder
# Use serve or nginx to host
npx serve -s dist -l 3000
```

## Port Configuration

### Default Ports
| Service | Port | Access URL |
|---------|------|-----------|
| Nginx (Frontend) | 80 | http://localhost |
| Frontend Dev | 5173 | http://localhost:5173 |
| Backend | 5000 | http://localhost:5000 |
| MySQL | 3306 | localhost:3306 |

### Change Ports (if needed)

**Docker Compose:**
```yaml
services:
  nginx:
    ports:
      - "8080:80"  # Access on 8080 instead of 80
  backend:
    ports:
      - "5001:5000"
  mysql:
    ports:
      - "3307:3306"
```

**Frontend .env:**
```
VITE_API_URL=http://localhost:5001/api
```

## Firewall Rules

### Allow Required Ports
```bash
# Linux (UFW)
sudo ufw allow 80/tcp
sudo ufw allow 3000/tcp
sudo ufw allow 5000/tcp
sudo ufw allow 3306/tcp

# Windows (PowerShell as Admin)
New-NetFirewallRule -DisplayName "Allow HTTP" -Direction Inbound -LocalPort 80 -Action Allow
New-NetFirewallRule -DisplayName "Allow Backend" -Direction Inbound -LocalPort 5000 -Action Allow
```

## Backup & Recovery

### Database Backup
```bash
# Backup database
docker-compose exec mysql mysqldump -u root -pagritrace_password agritrace > backup.sql

# Restore database
docker-compose exec mysql mysql -u root -pagritrace_password agritrace < backup.sql
```

### Application Backup
```bash
# Backup everything
tar -czf agritrace-backup.tar.gz agritrace/

# Restore
tar -xzf agritrace-backup.tar.gz
```

## Security Checklist

- [ ] Change default MySQL password
- [ ] Change JWT_SECRET to a strong value
- [ ] Enable HTTPS/SSL in production
- [ ] Configure firewall rules
- [ ] Set up regular database backups
- [ ] Review and update dependencies
- [ ] Enable logging and monitoring
- [ ] Use strong database user credentials

## Monitoring & Logs

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# Follow specific service
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100

# Timestamp included
docker-compose logs -f --timestamps
```

## Clean Installation

```bash
# Stop all services
docker-compose down

# Remove all containers and volumes
docker-compose down -v

# Remove images
docker rmi agritrace-frontend agritrace-backend

# Clean build
docker-compose up --build
```

## Troubleshooting Common Issues

### Issue: "Cannot connect to Docker daemon"
**Solution:** Start Docker Desktop or Docker service
```bash
# Linux
sudo service docker start

# macOS
# Open Docker Desktop application
```

### Issue: "Port 80 already in use"
**Solution:** Change port in docker-compose.yml or stop conflicting service
```bash
# Find process using port 80
lsof -i :80  # macOS/Linux
netstat -ano | findstr :80  # Windows

# Kill process or change port
```

### Issue: "Cannot authenticate with MySQL"
**Solution:** Verify credentials and restart
```bash
docker-compose down -v
docker-compose up --build
```

### Issue: "Out of disk space"
**Solution:** Clean up Docker resources
```bash
docker system prune -a
docker volume prune
```

## Getting Help

1. Check logs: `docker-compose logs [service]`
2. Verify configuration files
3. Test database connectivity
4. Check network connectivity
5. Review firewall rules

---

**You're all set! Start with `docker-compose up --build`**
