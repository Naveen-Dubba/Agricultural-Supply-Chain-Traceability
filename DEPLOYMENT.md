# Deployment Guide for AgriTrace

Complete guide for deploying AgriTrace to production environments.

## Deployment Options

### Option 1: Docker Compose (Recommended for Most Deployments)

#### Prerequisites
- Docker 20.10+
- Docker Compose 1.29+
- Linux server with 2+ cores and 4GB RAM
- Domain name and SSL certificates (for HTTPS)

#### Step-by-Step Deployment

**1. Prepare Server**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker --version
docker-compose --version
```

**2. Clone Project**
```bash
cd /var/www
git clone <repository-url> agritrace
cd agritrace
```

**3. Configure Environment**
```bash
# Backend environment
cp backend/.env.example backend/.env
nano backend/.env

# Set production values:
# - DB_PASSWORD to strong password
# - JWT_SECRET to cryptographically secure value
# - NODE_ENV=production

# Frontend environment
cp frontend/.env.example frontend/.env
nano frontend/.env

# Set VITE_API_URL to your domain
# VITE_API_URL=https://yourdomain.com/api
```

**4. Configure SSL/HTTPS**
```bash
# Create certificates directory
mkdir -p /etc/nginx/certs

# For Let's Encrypt (automated)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot certonly --standalone -d yourdomain.com

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /etc/nginx/certs/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /etc/nginx/certs/
```

**5. Update Nginx Configuration**
```bash
# Edit nginx.conf for HTTPS
nano nginx/nginx.conf
```

Update with:
```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;

    # Rest of configuration...
}
```

**6. Build and Deploy**
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Verify
docker-compose ps

# Check logs
docker-compose logs -f
```

**7. Database Initialization**
```bash
# Database creates automatically from schema.sql
# Verify tables
docker-compose exec mysql mysql -u root -p$DB_PASSWORD agritrace -e "SHOW TABLES;"
```

**8. Post-Deployment Verification**
```bash
# Check frontend
curl -I http://yourdomain.com

# Check API
curl -I http://yourdomain.com/api/auth/me

# Check database
docker-compose exec mysql mysql -u root -p$DB_PASSWORD agritrace -e "SELECT COUNT(*) FROM users;"
```

### Option 2: Cloud Platforms

#### AWS Deployment

**1. Using AWS Elastic Beanstalk**

```bash
# Install EB CLI
pip install awsebcli --upgrade --user

# Initialize
eb init -p docker agritrace

# Create environment
eb create agritrace-env

# Deploy
eb deploy

# Open
eb open
```

**2. Using Amazon ECS**

```bash
# Create ECR repositories
aws ecr create-repository --repository-name agritrace-frontend
aws ecr create-repository --repository-name agritrace-backend

# Push images
docker tag agritrace-frontend:latest <account>.dkr.ecr.region.amazonaws.com/agritrace-frontend:latest
docker push <account>.dkr.ecr.region.amazonaws.com/agritrace-frontend:latest

# Create ECS cluster and services
aws ecs create-cluster --cluster-name agritrace

# Deploy via ECS
aws ecs create-service --cluster agritrace --service-name agritrace-service ...
```

#### Google Cloud Deployment

**Using Cloud Run:**
```bash
# Deploy backend
gcloud run deploy agritrace-backend \
  --source ./backend \
  --platform managed \
  --region us-central1

# Deploy frontend
gcloud run deploy agritrace-frontend \
  --source ./frontend \
  --platform managed \
  --region us-central1
```

#### Azure Deployment

**Using App Service:**
```bash
# Create resource group
az group create --name agritrace-rg --location eastus

# Create container registry
az acr create --resource-group agritrace-rg --name agritraceacr --sku Basic

# Build and push
az acr build --registry agritraceacr --image agritrace-backend:latest ./backend

# Deploy to App Service
az appservice plan create --name agritrace-plan --resource-group agritrace-rg --sku B2 --is-linux

az webapp create --resource-group agritrace-rg --plan agritrace-plan --name agritrace-app --deployment-container-image-name-user agritraceacr.azurecr.io/agritrace-backend:latest
```

### Option 3: Kubernetes Deployment

**Prerequisites:**
- kubectl installed
- Kubernetes cluster access

**1. Create Kubernetes Manifests**

Create `k8s/namespace.yaml`:
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: agritrace
```

Create `k8s/mysql-deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
  namespace: agritrace
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: password
        ports:
        - containerPort: 3306
```

Create `k8s/backend-deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: agritrace-backend
  namespace: agritrace
spec:
  replicas: 3
  selector:
    matchLabels:
      app: agritrace-backend
  template:
    metadata:
      labels:
        app: agritrace-backend
    spec:
      containers:
      - name: backend
        image: agritrace-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: DB_HOST
          value: mysql
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: password
```

**2. Deploy**
```bash
# Create secrets
kubectl create secret generic mysql-secret \
  --from-literal=password=your-strong-password \
  -n agritrace

# Deploy
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mysql-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Verify
kubectl get pods -n agritrace
kubectl get services -n agritrace
```

## Security Hardening

### 1. Database Security

```sql
-- Create non-root user
CREATE USER 'agritrace_app'@'%' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON agritrace.* TO 'agritrace_app'@'%';

-- Remove anonymous users
DELETE FROM mysql.user WHERE user='';

-- Remove remote root login
DELETE FROM mysql.user WHERE user='root' AND host!='localhost';

-- Flush privileges
FLUSH PRIVILEGES;
```

### 2. API Security

Update `backend/server.js`:
```javascript
// Add helmet for security headers
const helmet = require('helmet');
app.use(helmet());

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// CORS - restrict origins
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

### 3. Environment Security

```bash
# Never commit .env files
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore

# Restrict file permissions
chmod 600 backend/.env
chmod 600 frontend/.env
```

### 4. SSL/TLS Configuration

Update `nginx/nginx.conf`:
```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000" always;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

## Monitoring & Logging

### 1. Container Logging

```bash
# View logs
docker-compose logs -f

# Specific service
docker-compose logs -f backend

# Save logs
docker-compose logs > agritrace-logs.txt
```

### 2. Application Monitoring

Install monitoring stack:
```bash
# Prometheus for metrics
docker pull prom/prometheus

# Grafana for visualization
docker pull grafana/grafana

# Update docker-compose.yml to include these services
```

### 3. Health Checks

Add to `docker-compose.yml`:
```yaml
backend:
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
    interval: 30s
    timeout: 10s
    retries: 3
    start_period: 40s

mysql:
  healthcheck:
    test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
    timeout: 20s
    retries: 10
```

## Backup & Recovery

### 1. Database Backup

```bash
# Automated daily backup
cat > backup-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups/mysql"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
docker-compose exec -T mysql mysqldump -u root -p$DB_PASSWORD agritrace > $BACKUP_DIR/agritrace_$TIMESTAMP.sql
gzip $BACKUP_DIR/agritrace_$TIMESTAMP.sql
# Keep only last 30 days
find $BACKUP_DIR -type f -mtime +30 -delete
EOF

chmod +x backup-db.sh

# Add to crontab
0 2 * * * /path/to/backup-db.sh
```

### 2. Full System Backup

```bash
# Backup entire application
tar -czf agritrace-backup-$(date +%Y%m%d).tar.gz \
  --exclude='node_modules' \
  --exclude='.git' \
  /var/www/agritrace

# Upload to cloud storage
aws s3 cp agritrace-backup-*.tar.gz s3://your-backup-bucket/
```

### 3. Restore from Backup

```bash
# Restore database
gzip -d backup.sql.gz
docker-compose exec mysql mysql -u root -p$DB_PASSWORD agritrace < backup.sql

# Restore application files
tar -xzf agritrace-backup.tar.gz
```

## Performance Optimization

### 1. Frontend Optimization

```bash
# Analyze bundle size
cd frontend
npm run build
npm install -g webpack-bundle-analyzer

# Enable compression in Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### 2. Backend Optimization

```javascript
// Add caching
const cache = require('express-cache-controller');
app.use(cache.cacheControl({
  maxAge: 300,
  sMaxAge: 3600
}));

// Database query optimization
// Add indexes on frequently searched columns
```

### 3. Database Optimization

```sql
-- Add indexes
CREATE INDEX idx_batch_id ON produce_batches(batch_id);
CREATE INDEX idx_status ON shipments(shipment_status);
CREATE INDEX idx_farmer_id ON farmers(id);

-- Analyze tables
ANALYZE TABLE produce_batches;
ANALYZE TABLE shipments;
ANALYZE TABLE farmers;
```

## Scaling Strategies

### 1. Horizontal Scaling

```yaml
# docker-compose.yml - multiple backend instances
backend:
  deploy:
    replicas: 3

# Nginx will load balance
upstream backend {
  server backend:5000;
  server backend:5000;
  server backend:5000;
}
```

### 2. Database Replication

```bash
# Set up MySQL master-slave replication
# Configure secondary MySQL instance
docker-compose up -d mysql-master mysql-slave

# Sync data
CHANGE MASTER TO MASTER_HOST='mysql-master', ...;
START SLAVE;
```

### 3. Caching Layer

```bash
# Add Redis cache
docker pull redis:latest

# Update backend to use Redis
# Install redis client: npm install redis
```

## Disaster Recovery Plan

### RTO/RPO Goals
- **RTO** (Recovery Time Objective): 1 hour
- **RPO** (Recovery Point Objective): 15 minutes

### Recovery Procedures

**1. Database Failure**
```bash
# Restore from latest backup
docker-compose exec mysql mysql -u root -p$DB_PASSWORD agritrace < latest-backup.sql

# Verify data integrity
docker-compose exec mysql mysql -u root -p$DB_PASSWORD agritrace -e "CHECK TABLE produce_batches;"
```

**2. Application Failure**
```bash
# Rebuild and redeploy
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

**3. Complete Infrastructure Failure**
```bash
# Deploy to new server
# 1. Set up new server with Docker
# 2. Clone repository
# 3. Restore database backup
# 4. Update DNS to new server IP
# 5. Restore SSL certificates
```

## Maintenance Tasks

### Regular Tasks

**Weekly:**
```bash
# Check logs for errors
docker-compose logs | grep -i error

# Monitor disk space
df -h

# Verify backups completed
ls -lh /backups/mysql/
```

**Monthly:**
```bash
# Database optimization
docker-compose exec mysql mysql -u root -p$DB_PASSWORD agritrace -e "OPTIMIZE TABLE produce_batches; OPTIMIZE TABLE shipments;"

# Security updates
docker pull mysql:8.0
docker pull node:18-alpine
docker-compose build --no-cache
```

**Quarterly:**
```bash
# Full system audit
# Review access logs
# Check for security vulnerabilities
# Update dependencies
```

## Troubleshooting Deployment

### Issue: Services won't start

```bash
# Check logs
docker-compose logs

# Check resource usage
docker stats

# Increase memory/CPU if needed
```

### Issue: Database connection fails

```bash
# Check database is running
docker-compose ps mysql

# Test connection
docker-compose exec backend mysql -h mysql -u root -p$DB_PASSWORD -e "SELECT 1;"
```

### Issue: Slow performance

```bash
# Monitor resource usage
docker stats

# Check database queries
docker-compose logs backend | grep "query"

# Analyze slow queries
docker-compose exec mysql mysql -u root -p$DB_PASSWORD -e "SHOW PROCESSLIST;"
```

## Rollback Procedure

```bash
# Tag images with versions
docker tag agritrace-backend:latest agritrace-backend:v1.0
docker tag agritrace-frontend:latest agritrace-frontend:v1.0

# In case of issues, rollback
docker-compose down
docker pull agritrace-backend:v1.0
docker pull agritrace-frontend:v1.0
docker-compose up -d
```

## Compliance & Audit

### Data Protection
- Implement GDPR compliance for data storage
- Encrypt sensitive data at rest
- Use HTTPS for all communications

### Access Control
- Regular security audits
- Log all API access
- Implement audit trails

### Backup Compliance
- Store backups in encrypted form
- Keep off-site copies
- Regular restore testing

---

**Last Updated**: January 2024
**Version**: 1.0
**Status**: Production Ready
