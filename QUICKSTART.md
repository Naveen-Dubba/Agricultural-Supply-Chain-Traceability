# AgriTrace Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Docker & Docker Compose installed
- Port 80, 3000, 5000, 3306 available

### Quick Start with Docker Compose

```bash
# 1. Navigate to project
cd agritrace

# 2. Start the application
docker-compose up --build

# 3. Wait for all services to start (about 2 minutes)
# You'll see: "agritrace-nginx running on 80"

# 4. Access the application
# Frontend: http://localhost
# Backend API: http://localhost/api
# MySQL: localhost:3306
```

### First Login
```
Email: admin@agritrace.com
Password: (use any password, demo mode accepts all)
Role: Admin
```

### What Happens During Startup

1. **MySQL Database** - Initializes with schema and sample data
2. **Backend API** - Starts Node.js/Express server
3. **Frontend** - Builds React application
4. **Nginx** - Starts reverse proxy on port 80

### Verify Everything is Working

**Check running containers:**
```bash
docker ps
```

You should see:
- agritrace-mysql
- agritrace-backend
- agritrace-frontend
- agritrace-nginx

**Check logs:**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

## 📱 Using the Application

### Dashboard
- View overall statistics
- See produce by category
- Track quality metrics
- Monitor shipments

### Managing Farmers
1. Go to "Farmers" section
2. Click "Add Farmer"
3. Fill farmer details
4. Farmer is registered and can be verified

### Creating Produce Batches
1. Go to "Produce" section
2. Click "New Batch"
3. Enter product details
4. Auto-generated Batch ID: AGRI-2026-0001
5. QR code generated automatically
6. Download QR code for labeling

### Tracking Produce
1. Get Batch ID (e.g., AGRI-2026-0001)
2. Visit: http://localhost/trace/AGRI-2026-0001
3. See complete supply chain journey
4. View all events and locations

### Quality Inspection
1. Navigate to "Quality Inspections"
2. Click "New Inspection"
3. Select batch and quality grade
4. Record inspection details
5. Save report

### Warehouse Management
1. View all warehouses
2. Check inventory levels
3. Monitor capacity

### Shipment Tracking
1. Create shipments
2. Track status (Scheduled → Dispatched → In Transit → Delivered)
3. Update delivery information

## 🔧 Configuration Files

### Backend (.env)
```bash
PORT=5000
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=agritrace_password
DB_NAME=agritrace
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=production
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost/api
```

## 📊 Default Database Data

The system comes with pre-loaded:
- ✅ 3 Farmers
- ✅ 3 Produce Batches
- ✅ 2 Collection Centers
- ✅ Quality Inspection Records
- ✅ 2 Warehouses
- ✅ Shipment Records
- ✅ Distributor & Retailers
- ✅ Complete Traceability Events

## 🛑 Stopping the Application

```bash
docker-compose down

# Remove volumes (delete database data)
docker-compose down -v
```

## 🐛 Troubleshooting

### Issue: Port 80 already in use
**Solution:**
```bash
# Stop other services using port 80
# Or change Nginx port in docker-compose.yml
ports:
  - "8080:80"  # Access at localhost:8080
```

### Issue: MySQL fails to start
**Solution:**
```bash
docker-compose down -v
docker-compose up --build
```

### Issue: Cannot connect to API
**Solution:**
```bash
# Check backend is running
docker logs agritrace-backend

# Verify API URL in frontend .env
VITE_API_URL=http://localhost/api
```

### Issue: Database tables not created
**Solution:**
```bash
docker-compose exec mysql mysql -u root -pagritrace_password agritrace < database/schema.sql
docker-compose exec mysql mysql -u root -pagritrace_password agritrace < database/seed.sql
```

## 📚 API Testing

### Using curl

**Login:**
```bash
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@agritrace.com","password":"password"}'
```

**Get farmers:**
```bash
curl -X GET http://localhost/api/farmers \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman
1. Import API collection
2. Set Authorization header with Bearer token
3. Test each endpoint

## 🌐 Public Traceability Feature

**Anyone can track produce without login:**

1. Get Batch ID from produce documentation
2. Visit: `http://localhost/trace/{BATCH_ID}`
   - Example: `http://localhost/trace/AGRI-2026-0001`
3. View complete supply chain journey
4. No authentication required

## 📈 Understanding the Supply Chain Flow

```
Farmer
  ↓
Produce Registered (Event: "Produce Registered")
  ↓
Collection Center
  ↓
Collected (Event: "Collected")
  ↓
Quality Inspector
  ↓
Quality Inspected (Event: "Quality Inspected")
  ↓
Warehouse
  ↓
Stored (Event: "Stored")
  ↓
Logistics Provider
  ↓
Dispatched (Event: "Dispatched")
  ↓
In Transit (Event: "In Transit")
  ↓
Distributor
  ↓
Delivered to Distributor (Event: "Delivered to Distributor")
  ↓
Retailer
  ↓
Delivered to Retailer (Event: "Delivered to Retailer")
  ↓
Consumer
  ↓
Sold (Event: "Sold")
```

## 🎯 Key Features to Explore

1. **QR Code Generation** - Click "View" on any produce batch
2. **Dashboard Analytics** - See charts and statistics
3. **Real-time Tracking** - Follow produce in transit
4. **Role-based Access** - Different views for different roles
5. **Quality Grading** - Track A/B/C grades
6. **Inventory Management** - Monitor warehouse levels

## 📞 Need Help?

- Check logs: `docker-compose logs [service-name]`
- Read API documentation in README.md
- Review database schema in database/schema.sql
- Check .env configuration files

## 🎉 Next Steps

After initial setup:
1. Change default passwords
2. Set up real user accounts
3. Configure your farms and locations
4. Start registering produce batches
5. Configure quality inspection procedures
6. Set up warehouse locations
7. Configure distribution network

---

**Happy Tracing! 🌾**
