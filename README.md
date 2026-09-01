# AgriTrace - Agricultural Supply Chain Traceability System

A complete full-stack web application for tracking agricultural produce from farmer to consumer with complete transparency and traceability.

## Project Overview

AgriTrace is a digital agricultural supply-chain management system that provides end-to-end traceability of agricultural produce. The platform tracks produce through:

**Farmer → Produce Registration → Collection Center → Quality Inspection → Warehouse → Transportation → Distributor → Retailer → Consumer**

Every produce batch receives a unique Batch ID and QR code for verification and traceability.

## Technology Stack

### Frontend
- **React.js 18** with Vite
- **JavaScript (ES6+)**
- **HTML5 & CSS3**
- **Recharts** for charts and analytics
- **Lucide React** for icons
- **Axios** for HTTP client
- **React Router** for navigation
- **Responsive design** for all devices

### Backend
- **Node.js** runtime
- **Express.js** framework
- **MySQL 8.0** database
- **JWT** authentication
- **bcryptjs** for password hashing
- **QR Code** generation
- **CORS** enabled
- **Error handling middleware**

### DevOps & Deployment
- **Docker** & **Docker Compose**
- **Nginx** reverse proxy
- **MySQL** containerized database

## Features

### 1. Authentication & Authorization
- ✅ User registration with role selection
- ✅ Login with JWT tokens
- ✅ Password encryption with bcrypt
- ✅ Role-based access control (RBAC)
- ✅ Session persistence
- ✅ Protected routes

### 2. User Roles
- Admin
- Farmer
- Collection Center Manager
- Quality Inspector
- Warehouse Manager
- Logistics Provider
- Distributor
- Retailer
- Consumer

### 3. Core Modules

#### Farmer Management
- Add, edit, delete farmers
- Verify farmer credentials
- Track farmer statistics
- Farm details management

#### Produce Batch Management
- Register new produce batches
- Auto-generate Batch IDs (Format: AGRI-2026-0001)
- Auto-generate QR codes
- Track quality grades
- View batch details and history

#### Quality Inspection
- Create inspection reports
- Quality grading (A, B, C, Rejected)
- Track inspection results
- Generate quality alerts

#### Warehouse Management
- Manage storage facilities
- Track inventory
- Monitor capacity
- Temperature & humidity tracking

#### Shipment Tracking
- Create and track shipments
- Real-time status updates
- Route tracking
- Delivery confirmation

#### Distributor & Retailer Management
- Manage distribution network
- Track product flow
- Inventory management
- Sales tracking

### 4. QR Code Traceability
- ✅ Unique QR code per batch
- ✅ Public traceability page (no login required)
- ✅ Complete supply chain journey visibility
- ✅ Verification badge for genuine products

### 5. Dashboard & Analytics
- Real-time statistics
- Dashboard charts (produce by category, quality grades, shipment status)
- Recent activities feed
- Inventory insights
- Reports and analytics module

### 6. Notifications
- Quality alerts
- Shipment delays
- Inventory warnings
- System notifications

## Project Structure

```
agritrace/
├── frontend/                 # React.js application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Auth context
│   │   ├── hooks/           # Custom hooks
│   │   ├── layouts/         # Layout components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── assets/          # Static assets
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── .env.example
│
├── backend/                  # Node.js/Express API
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── server.js            # Express server
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── database/                 # Database files
│   ├── schema.sql           # Database schema
│   └── seed.sql             # Sample data
│
├── nginx/                    # Nginx configuration
│   └── nginx.conf           # Reverse proxy config
│
├── docker-compose.yml        # Docker Compose config
├── .gitignore
└── README.md
```

## Prerequisites

- **Docker & Docker Compose** (for containerized setup)
- OR
- **Node.js 18+** (for development)
- **MySQL 8.0** (for local development)
- **npm** or **yarn**

## Installation & Setup

### Option 1: Using Docker Compose (Recommended)

1. **Clone/Navigate to project directory**
```bash
cd agritrace
```

2. **Create environment files**
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. **Build and start containers**
```bash
docker-compose up --build
```

4. **Access the application**
- Frontend: http://localhost
- Backend API: http://localhost/api
- MySQL: localhost:3306

### Option 2: Local Development Setup

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env

# Update .env with local MySQL credentials
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=agritrace

npm start
```

#### Database Setup
```bash
# Create database and tables
mysql -u root -p < database/schema.sql
mysql -u root -p agritrace < database/seed.sql
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env

# Update .env
VITE_API_URL=http://localhost:5000/api

npm run dev
```

## Default Demo Login

```
Email: admin@agritrace.com
Password: (any password for demo purposes)
Role: Admin
```

## API Documentation

### Authentication Endpoints
```
POST   /api/auth/register       - User registration
POST   /api/auth/login          - User login
GET    /api/auth/me             - Get current user
```

### Farmer Endpoints
```
GET    /api/farmers             - Get all farmers
GET    /api/farmers/:id         - Get farmer details
POST   /api/farmers             - Add farmer
PUT    /api/farmers/:id         - Update farmer
DELETE /api/farmers/:id         - Delete farmer
PATCH  /api/farmers/:id/verify  - Verify farmer
GET    /api/farmers/:id/stats   - Get farmer statistics
```

### Produce Endpoints
```
GET    /api/produce             - Get all produce batches
GET    /api/produce/:id         - Get batch details
POST   /api/produce             - Add new batch
PUT    /api/produce/:id         - Update batch
DELETE /api/produce/:id         - Delete batch
GET    /api/produce/trace/:batchId - Get traceability (public)
```

### Quality Inspection Endpoints
```
GET    /api/inspections         - Get all inspections
GET    /api/inspections/:id     - Get inspection details
POST   /api/inspections         - Create inspection
PUT    /api/inspections/:id     - Update inspection
DELETE /api/inspections/:id     - Delete inspection
```

### Warehouse Endpoints
```
GET    /api/warehouses          - Get all warehouses
GET    /api/warehouses/:id      - Get warehouse details
POST   /api/warehouses          - Add warehouse
PUT    /api/warehouses/:id      - Update warehouse
DELETE /api/warehouses/:id      - Delete warehouse
GET    /api/warehouses/:id/inventory - Get inventory
```

### Shipment Endpoints
```
GET    /api/shipments           - Get all shipments
GET    /api/shipments/:id       - Get shipment details
POST   /api/shipments           - Create shipment
PATCH  /api/shipments/:id/status - Update shipment status
DELETE /api/shipments/:id       - Delete shipment
```

### Dashboard Endpoints
```
GET    /api/dashboard/stats     - Get dashboard statistics
GET    /api/dashboard/activities - Get recent activities
GET    /api/dashboard/categories - Produce by category
GET    /api/dashboard/quality   - Quality grades data
GET    /api/dashboard/shipments - Shipment status data
```

## Database Schema

### Key Tables
- **users** - User accounts and authentication
- **farmers** - Farmer information
- **produce_batches** - Produce batch records with QR codes
- **collection_records** - Collection center records
- **quality_inspections** - Quality inspection reports
- **warehouses** - Warehouse facilities
- **inventory** - Warehouse inventory
- **shipments** - Shipment records
- **distributors** - Distributor information
- **retailers** - Retailer information
- **traceability_events** - Complete supply chain events
- **notifications** - User notifications

All tables include proper relationships, indexes, and timestamps for audit trails.

## Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT authentication with 7-day expiration
- ✅ Role-based authorization middleware
- ✅ CORS configuration
- ✅ SQL injection prevention (parameterized queries)
- ✅ Environment variables for sensitive data
- ✅ Protected API routes
- ✅ Token verification on protected endpoints

## Running the Application

### With Docker Compose
```bash
docker-compose up
```

### Frontend Development Server
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

### Backend Development Server
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
# Creates optimized build in dist/
```

**Backend:**
```bash
cd backend
npm start
# Starts production server
```

## Common Tasks

### Adding a New Farmer
1. Navigate to Farmers page
2. Click "Add Farmer" button
3. Fill in farm details
4. Save farmer record

### Creating a Produce Batch
1. Go to Produce page
2. Click "New Batch" button
3. Enter batch details (product, quantity, date, etc.)
4. System auto-generates Batch ID and QR code
5. Save batch

### Tracking Produce
1. Use Batch ID to search produce
2. View complete supply chain journey
3. Scan QR code for public traceability
4. See all events and movements

### Quality Inspection
1. Go to Quality Inspection page
2. Create new inspection report
3. Select batch and quality grade
4. Save inspection
5. System updates batch quality status

## Performance Optimizations

- ✅ React lazy loading and code splitting
- ✅ Database indexes for frequently queried columns
- ✅ Connection pooling for database
- ✅ Optimized API responses
- ✅ Responsive images and assets
- ✅ GZIP compression via Nginx

## Troubleshooting

### Database Connection Error
```
Check .env variables match docker-compose.yml
Ensure MySQL container is running: docker ps
```

### Frontend Cannot Connect to Backend
```
Check docker-compose networking
Verify backend container is running
Check API_URL in frontend .env
```

### Port Already in Use
```
docker ps  # See running containers
docker stop <container-id>  # Stop conflicting service
```

### QR Code Not Displaying
```
Ensure qrcode.react library is installed
Check batch has valid Batch ID
Verify frontend has read access to QR data
```

## Development Notes

- Frontend uses React Router for navigation
- All API calls go through centralized apiClient with interceptors
- Authentication context manages user state globally
- Charts use Recharts for responsive, interactive visualizations
- Sidebar is responsive and collapses on mobile devices

## Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Set strong JWT_SECRET
- [ ] Configure database backups
- [ ] Set up SSL/TLS certificates (Nginx)
- [ ] Configure database user with minimal privileges
- [ ] Enable logging and monitoring
- [ ] Test all workflows end-to-end
- [ ] Performance testing completed
- [ ] Security audit passed

## Future Enhancements

- SMS/Email notifications
- Mobile app (React Native)
- Advanced analytics and reporting
- Blockchain integration for immutability
- IoT sensor integration
- Multi-language support
- Integration with government certifications
- Export data to various formats

## Support & Documentation

For issues, questions, or contributions:
1. Check README and API documentation
2. Review code comments
3. Check database schema
4. Refer to component documentation

## License

This project is developed for educational and commercial agricultural supply chain management purposes.

## Contact

For inquiries and support regarding AgriTrace platform implementation.

---

**AgriTrace - Transforming Agricultural Supply Chains Through Technology**
*Track with Transparency | Deliver with Confidence*
