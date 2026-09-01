# Comprehensive API Documentation for AgriTrace

## Base URL
- Production: `http://localhost/api` (via Nginx proxy)
- Development: `http://localhost:5000/api`
- Docker Container: `http://backend:5000/api`

## Authentication

All endpoints (except public ones) require Bearer token authentication.

### Header Format
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Response Format
```json
{
  "data": { /* response data */ },
  "message": "Success message",
  "error": null
}
```

---

## 1. Authentication Module (/api/auth)

### 1.1 Register User
**POST** `/auth/register`

Request body:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "phone": "9876543210",
  "role": "Farmer",
  "organizationName": "John's Farm",
  "location": "Karnataka"
}
```

Response (201 Created):
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "Farmer"
  }
}
```

### 1.2 Login User
**POST** `/auth/login`

Request body:
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

Response (200 OK):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "Farmer"
  }
}
```

### 1.3 Get Current User
**GET** `/auth/me`

Headers: Authorization required

Response (200 OK):
```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "role": "Farmer",
  "organizationName": "John's Farm",
  "location": "Karnataka",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## 2. Farmer Module (/api/farmers)

### 2.1 Get All Farmers
**GET** `/farmers`

Query Parameters:
- `page` - Page number (default: 1)
- `limit` - Records per page (default: 10)
- `status` - Filter by verification status (Verified/Pending)

Response (200 OK):
```json
{
  "farmers": [
    {
      "id": 1,
      "farmer_id": "FARM-0001",
      "full_name": "John Doe",
      "email": "john@example.com",
      "farm_name": "Green Valley Farm",
      "farm_location": "Bangalore, Karnataka",
      "farm_size": "50",
      "verification_status": "Verified",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1,
  "page": 1
}
```

### 2.2 Get Farmer Details
**GET** `/farmers/:id`

Parameters:
- `id` - Farmer ID (integer)

Response (200 OK):
```json
{
  "id": 1,
  "farmer_id": "FARM-0001",
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "farm_name": "Green Valley Farm",
  "farm_location": "Bangalore, Karnataka",
  "farm_size": "50",
  "produce_types": "Tomato, Onion, Potato",
  "verification_status": "Verified",
  "total_batches": 10,
  "created_at": "2024-01-15T10:30:00Z"
}
```

### 2.3 Add New Farmer
**POST** `/farmers`

Authorization: Admin, CollectionCenterManager required

Request body:
```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543211",
  "farmName": "Smith Organic Farm",
  "farmLocation": "Mumbai, Maharashtra",
  "farmSize": "75",
  "produceTypes": "Vegetables, Fruits"
}
```

Response (201 Created):
```json
{
  "message": "Farmer added successfully",
  "farmer": {
    "id": 2,
    "farmer_id": "FARM-0002",
    "full_name": "Jane Smith",
    "farm_name": "Smith Organic Farm",
    "verification_status": "Pending"
  }
}
```

### 2.4 Update Farmer
**PUT** `/farmers/:id`

Authorization: Admin or self required

Request body:
```json
{
  "farm_name": "Updated Farm Name",
  "farm_location": "New Location",
  "farm_size": "100"
}
```

Response (200 OK):
```json
{
  "message": "Farmer updated successfully",
  "farmer": { /* updated farmer data */ }
}
```

### 2.5 Delete Farmer
**DELETE** `/farmers/:id`

Authorization: Admin required

Response (200 OK):
```json
{
  "message": "Farmer deleted successfully"
}
```

### 2.6 Verify/Reject Farmer
**PATCH** `/farmers/:id/verify`

Authorization: Admin required

Request body:
```json
{
  "status": "Verified"
}
```

Response (200 OK):
```json
{
  "message": "Farmer verification status updated",
  "status": "Verified"
}
```

### 2.7 Get Farmer Statistics
**GET** `/farmers/:id/stats`

Response (200 OK):
```json
{
  "total_batches": 25,
  "completed_deliveries": 20,
  "pending_inspections": 3,
  "total_quantity": 5000,
  "quality_grade_average": "Grade A"
}
```

---

## 3. Produce Module (/api/produce)

### 3.1 Get All Produce Batches
**GET** `/produce`

Query Parameters:
- `status` - Filter by status (Registered/Collection/Inspection/Storage/Transportation/Distribution/Retail/Completed)
- `farmer` - Filter by farmer ID
- `product` - Search by product name

Response (200 OK):
```json
{
  "batches": [
    {
      "id": 1,
      "batch_id": "AGRI-2026-0001",
      "product_name": "Tomato",
      "quantity": 500,
      "unit": "kg",
      "farmer_id": 1,
      "farmer_name": "John Doe",
      "harvest_date": "2024-01-15",
      "current_stage": "Inspection",
      "status": "Active",
      "quality_grade": "Grade A",
      "qr_code": "data:image/png;base64,...",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 3.2 Get Batch Details
**GET** `/produce/:id`

Parameters:
- `id` - Batch ID (integer)

Response (200 OK):
```json
{
  "id": 1,
  "batch_id": "AGRI-2026-0001",
  "product_name": "Tomato",
  "variety": "Hybrid",
  "quantity": 500,
  "unit": "kg",
  "farmer_id": 1,
  "farmer_name": "John Doe",
  "farm_location": "Bangalore",
  "harvest_date": "2024-01-15",
  "current_stage": "Inspection",
  "status": "Active",
  "initial_quality_grade": "Grade A",
  "qr_code": "data:image/png;base64,...",
  "storage_temperature": 18,
  "storage_humidity": 65,
  "created_at": "2024-01-15T10:30:00Z"
}
```

### 3.3 Add Produce Batch
**POST** `/produce`

Authorization: Farmer required

Request body:
```json
{
  "farmerUserId": 1,
  "productName": "Tomato",
  "variety": "Hybrid",
  "quantity": 500,
  "unit": "kg",
  "harvestDate": "2024-01-15",
  "currentStage": "Registered",
  "status": "Active"
}
```

Response (201 Created):
```json
{
  "message": "Produce batch registered successfully",
  "batch": {
    "id": 1,
    "batch_id": "AGRI-2026-0001",
    "product_name": "Tomato",
    "qr_code": "data:image/png;base64,...",
    "status": "Active"
  }
}
```

### 3.4 Update Produce Batch
**PUT** `/produce/:id`

Request body:
```json
{
  "current_stage": "Storage",
  "status": "Active",
  "quantity_remaining": 490
}
```

Response (200 OK):
```json
{
  "message": "Batch updated successfully"
}
```

### 3.5 Delete Produce Batch
**DELETE** `/produce/:id`

Response (200 OK):
```json
{
  "message": "Batch deleted successfully"
}
```

### 3.6 Get Public Traceability (No Auth Required)
**GET** `/produce/trace/:batchId`

Parameters:
- `batchId` - Batch ID string (e.g., "AGRI-2026-0001")

Response (200 OK):
```json
{
  "batch": {
    "batch_id": "AGRI-2026-0001",
    "product_name": "Tomato",
    "farmer_name": "John Doe",
    "farm_location": "Bangalore",
    "harvest_date": "2024-01-15",
    "quantity": 500,
    "unit": "kg"
  },
  "events": [
    {
      "id": 1,
      "event_type": "Produce Registered",
      "event_date": "2024-01-15",
      "event_time": "10:30",
      "location": "Bangalore",
      "description": "Produce registered by farmer"
    },
    {
      "id": 2,
      "event_type": "Collected",
      "event_date": "2024-01-16",
      "event_time": "14:00",
      "location": "Collection Center",
      "description": "Produce collected at center"
    }
  ]
}
```

---

## 4. Quality Inspection Module (/api/inspections)

### 4.1 Get All Inspections
**GET** `/inspections`

Query Parameters:
- `status` - Filter by inspection result
- `grade` - Filter by quality grade
- `batch` - Filter by batch ID

Response (200 OK):
```json
{
  "inspections": [
    {
      "id": 1,
      "inspection_id": "INSP-000001",
      "batch_id": 1,
      "batch_id_str": "AGRI-2026-0001",
      "quality_grade": "Grade A",
      "inspection_result": "Approved",
      "inspection_date": "2024-01-16",
      "color_appearance": "Bright Red",
      "freshness": "Fresh",
      "moisture_level": "85%",
      "pest_damage": "None",
      "inspector_notes": "Good quality produce",
      "created_at": "2024-01-16T15:00:00Z"
    }
  ]
}
```

### 4.2 Get Inspection Details
**GET** `/inspections/:id`

Response (200 OK):
```json
{
  "id": 1,
  "inspection_id": "INSP-000001",
  "batch_id": "AGRI-2026-0001",
  "quality_grade": "Grade A",
  "inspection_result": "Approved",
  "inspection_date": "2024-01-16",
  "color_appearance": "Bright Red",
  "freshness": "Fresh",
  "moisture_level": "85%",
  "pest_damage": "None",
  "disease_indicators": "None",
  "contamination": "None",
  "inspector_notes": "Good quality produce",
  "recommendations": "Proceed to storage",
  "created_at": "2024-01-16T15:00:00Z"
}
```

### 4.3 Create Inspection Report
**POST** `/inspections`

Authorization: QualityInspector required

Request body:
```json
{
  "batchId": 1,
  "inspectorUserId": 3,
  "qualityGrade": "Grade A",
  "inspectionResult": "Approved",
  "inspectionDate": "2024-01-16",
  "colorAppearance": "Bright Red",
  "freshness": "Fresh",
  "moistureLevel": "85%",
  "pestDamage": "None",
  "diseaseIndicators": "None",
  "contamination": "None",
  "inspectorNotes": "Good quality produce",
  "recommendations": "Proceed to storage"
}
```

Response (201 Created):
```json
{
  "message": "Inspection report created successfully",
  "inspection": {
    "id": 1,
    "inspection_id": "INSP-000001",
    "quality_grade": "Grade A"
  }
}
```

### 4.4 Update Inspection
**PUT** `/inspections/:id`

Request body:
```json
{
  "quality_grade": "Grade B",
  "inspection_result": "Conditional Approval",
  "inspector_notes": "Needs additional processing"
}
```

Response (200 OK):
```json
{
  "message": "Inspection updated successfully"
}
```

### 4.5 Delete Inspection
**DELETE** `/inspections/:id`

Response (200 OK):
```json
{
  "message": "Inspection deleted successfully"
}
```

---

## 5. Warehouse Module (/api/warehouses)

### 5.1 Get All Warehouses
**GET** `/warehouses`

Response (200 OK):
```json
{
  "warehouses": [
    {
      "id": 1,
      "warehouse_name": "Central Warehouse",
      "location": "Bangalore",
      "capacity": 10000,
      "available_capacity": 7500,
      "temperature": 18,
      "humidity": 65,
      "status": "Active",
      "manager_name": "Ramesh Kumar",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 5.2 Get Warehouse Details
**GET** `/warehouses/:id`

Response (200 OK):
```json
{
  "id": 1,
  "warehouse_name": "Central Warehouse",
  "location": "Bangalore",
  "address": "123 Storage Lane, Bangalore",
  "capacity": 10000,
  "available_capacity": 7500,
  "temperature": 18,
  "humidity": 65,
  "status": "Active",
  "manager_id": 2,
  "manager_name": "Ramesh Kumar",
  "contact": "9876543210",
  "security_level": "High",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### 5.3 Add Warehouse
**POST** `/warehouses`

Authorization: Admin required

Request body:
```json
{
  "warehouseName": "North Warehouse",
  "location": "Delhi",
  "capacity": 15000,
  "address": "456 Storage Road, Delhi",
  "managerUserId": 5,
  "temperature": 20,
  "humidity": 60,
  "status": "Active"
}
```

Response (201 Created):
```json
{
  "message": "Warehouse added successfully",
  "warehouse": {
    "id": 2,
    "warehouse_name": "North Warehouse"
  }
}
```

### 5.4 Update Warehouse
**PUT** `/warehouses/:id`

Request body:
```json
{
  "temperature": 19,
  "humidity": 62,
  "available_capacity": 7200
}
```

Response (200 OK):
```json
{
  "message": "Warehouse updated successfully"
}
```

### 5.5 Delete Warehouse
**DELETE** `/warehouses/:id`

Response (200 OK):
```json
{
  "message": "Warehouse deleted successfully"
}
```

### 5.6 Get Warehouse Inventory
**GET** `/warehouses/:id/inventory`

Response (200 OK):
```json
{
  "warehouse": "Central Warehouse",
  "inventory": [
    {
      "id": 1,
      "batch_id": "AGRI-2026-0001",
      "product_name": "Tomato",
      "quantity_stored": 450,
      "unit": "kg",
      "storage_date": "2024-01-16",
      "expected_removal_date": "2024-02-15",
      "storage_condition": "Good"
    }
  ],
  "total_inventory": 450
}
```

---

## 6. Shipment Module (/api/shipments)

### 6.1 Get All Shipments
**GET** `/shipments`

Query Parameters:
- `status` - Filter by status
- `batch` - Filter by batch ID

Response (200 OK):
```json
{
  "shipments": [
    {
      "id": 1,
      "shipment_id": "SHIP-0001",
      "batch_id": "AGRI-2026-0001",
      "origin": "Bangalore",
      "destination": "Delhi",
      "shipment_status": "In Transit",
      "dispatch_date": "2024-01-20",
      "expected_arrival": "2024-01-25",
      "vehicle_number": "KA-01-AB-1234",
      "driver_name": "Prakash",
      "temperature": 18,
      "humidity": 65,
      "created_at": "2024-01-20T08:00:00Z"
    }
  ]
}
```

### 6.2 Get Shipment Details
**GET** `/shipments/:id`

Response (200 OK):
```json
{
  "id": 1,
  "shipment_id": "SHIP-0001",
  "batch_id": "AGRI-2026-0001",
  "product_name": "Tomato",
  "quantity": 450,
  "origin": "Bangalore",
  "destination": "Delhi",
  "origin_warehouse": "Central Warehouse",
  "destination_warehouse": "North Warehouse",
  "shipment_status": "In Transit",
  "dispatch_date": "2024-01-20",
  "expected_arrival": "2024-01-25",
  "actual_arrival": null,
  "vehicle_number": "KA-01-AB-1234",
  "driver_name": "Prakash",
  "driver_contact": "9876543210",
  "temperature": 18,
  "humidity": 65,
  "tracking_updates": [
    {
      "location": "Bangalore",
      "timestamp": "2024-01-20T08:00:00Z",
      "status": "Dispatched"
    }
  ]
}
```

### 6.3 Create Shipment
**POST** `/shipments`

Authorization: LogisticsProvider required

Request body:
```json
{
  "batchId": 1,
  "origin": "Bangalore",
  "destination": "Delhi",
  "originWarehouse": 1,
  "destinationWarehouse": 2,
  "shipmentStatus": "Scheduled",
  "dispatchDate": "2024-01-20",
  "expectedArrival": "2024-01-25",
  "vehicleNumber": "KA-01-AB-1234",
  "driverName": "Prakash",
  "driverContact": "9876543210",
  "logisticsProviderUserId": 6
}
```

Response (201 Created):
```json
{
  "message": "Shipment created successfully",
  "shipment": {
    "id": 1,
    "shipment_id": "SHIP-0001",
    "shipment_status": "Scheduled"
  }
}
```

### 6.4 Update Shipment Status
**PATCH** `/shipments/:id/status`

Request body:
```json
{
  "status": "In Transit",
  "location": "Bangalore",
  "temperature": 18,
  "humidity": 65
}
```

Response (200 OK):
```json
{
  "message": "Shipment status updated",
  "shipment_status": "In Transit"
}
```

### 6.5 Delete Shipment
**DELETE** `/shipments/:id`

Response (200 OK):
```json
{
  "message": "Shipment deleted successfully"
}
```

---

## 7. Dashboard Module (/api/dashboard)

### 7.1 Get Dashboard Statistics
**GET** `/dashboard/stats`

Response (200 OK):
```json
{
  "total_farmers": 50,
  "total_batches": 250,
  "active_shipments": 15,
  "total_warehouses": 5,
  "total_distributors": 20,
  "total_retailers": 150,
  "rejected_produce": 8,
  "completed_deliveries": 200,
  "pending_inspections": 12,
  "total_inventory": 5000,
  "average_quality_grade": "Grade A"
}
```

### 7.2 Get Recent Activities
**GET** `/dashboard/activities`

Response (200 OK):
```json
{
  "activities": [
    {
      "id": 1,
      "type": "Batch Created",
      "description": "Batch AGRI-2026-0001 created",
      "timestamp": "2024-01-20T10:00:00Z",
      "user": "John Doe"
    },
    {
      "id": 2,
      "type": "Inspection Completed",
      "description": "Quality inspection passed",
      "timestamp": "2024-01-20T11:30:00Z",
      "user": "Inspector Name"
    }
  ]
}
```

### 7.3 Get Produce by Category
**GET** `/dashboard/categories`

Response (200 OK):
```json
{
  "categories": [
    { "category": "Vegetables", "count": 120 },
    { "category": "Fruits", "count": 80 },
    { "category": "Grains", "count": 50 }
  ]
}
```

### 7.4 Get Quality Grades Distribution
**GET** `/dashboard/quality`

Response (200 OK):
```json
{
  "grades": [
    { "grade": "Grade A", "count": 200 },
    { "grade": "Grade B", "count": 35 },
    { "grade": "Grade C", "count": 10 },
    { "grade": "Rejected", "count": 5 }
  ]
}
```

### 7.5 Get Shipment Status Distribution
**GET** `/dashboard/shipments`

Response (200 OK):
```json
{
  "shipments": [
    { "status": "Scheduled", "count": 5 },
    { "status": "In Transit", "count": 8 },
    { "status": "Delivered", "count": 200 },
    { "status": "Delayed", "count": 2 }
  ]
}
```

---

## 8. Supply Chain Module (/api/supply-chain)

### 8.1 Get All Distributors
**GET** `/supply-chain/distributors`

Response (200 OK):
```json
{
  "distributors": [
    {
      "id": 1,
      "distributor_name": "Fresh Dist Ltd",
      "company": "Fresh Distribution",
      "location": "Delhi",
      "contact": "9876543210",
      "email": "fresh@dist.com",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 8.2 Get All Retailers
**GET** `/supply-chain/retailers`

Response (200 OK):
```json
{
  "retailers": [
    {
      "id": 1,
      "store_name": "Fresh Mart",
      "owner_name": "Rajesh Kumar",
      "address": "123 Market Street",
      "city": "Bangalore",
      "contact": "9876543210",
      "email": "fresh@mart.com",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 8.3 Get Retailer Inventory
**GET** `/supply-chain/retailers/:id/inventory`

Response (200 OK):
```json
{
  "retailer": "Fresh Mart",
  "inventory": [
    {
      "id": 1,
      "batch_id": "AGRI-2026-0001",
      "product_name": "Tomato",
      "quantity": 100,
      "unit": "kg",
      "received_date": "2024-01-22",
      "expiry_date": "2024-02-05"
    }
  ]
}
```

---

## 9. User Module (/api/users)

### 9.1 Get All Users
**GET** `/users`

Query Parameters:
- `role` - Filter by role

Response (200 OK):
```json
{
  "users": [
    {
      "id": 1,
      "fullName": "Admin User",
      "email": "admin@agritrace.com",
      "phone": "9876543210",
      "role": "Admin",
      "organization": "AgriTrace",
      "status": "Active",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 9.2 Get User Details
**GET** `/users/:id`

Response (200 OK):
```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "john@agritrace.com",
  "phone": "9876543210",
  "role": "Farmer",
  "organization": "John's Farm",
  "location": "Bangalore",
  "status": "Active",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### 9.3 Get User Notifications
**GET** `/users/:id/notifications`

Response (200 OK):
```json
{
  "notifications": [
    {
      "id": 1,
      "type": "Quality Alert",
      "message": "Quality inspection failed for batch AGRI-2026-0001",
      "read": false,
      "created_at": "2024-01-22T14:00:00Z"
    },
    {
      "id": 2,
      "type": "Shipment Update",
      "message": "Shipment SHIP-0001 delayed by 2 hours",
      "read": true,
      "created_at": "2024-01-22T13:00:00Z"
    }
  ],
  "unread_count": 1
}
```

### 9.4 Mark Notification as Read
**PATCH** `/users/notifications/:notificationId/read`

Response (200 OK):
```json
{
  "message": "Notification marked as read"
}
```

---

## Error Handling

### Common Error Responses

**400 Bad Request**
```json
{
  "error": "Invalid request data",
  "message": "Email is required",
  "status": 400
}
```

**401 Unauthorized**
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token",
  "status": 401
}
```

**403 Forbidden**
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource",
  "status": 403
}
```

**404 Not Found**
```json
{
  "error": "Not Found",
  "message": "Resource not found",
  "status": 404
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal Server Error",
  "message": "An error occurred on the server",
  "status": 500
}
```

---

## Rate Limiting

- No rate limiting applied (configure as needed)
- Recommended: 100 requests per minute per IP

## Testing with cURL

### Example: Login and Get Token
```bash
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@agritrace.com","password":"password"}' \
  | jq '.token'
```

### Example: Get Farmers with Token
```bash
TOKEN="your_jwt_token"
curl -X GET http://localhost/api/farmers \
  -H "Authorization: Bearer $TOKEN"
```

---

## Pagination

All list endpoints support pagination:

Query Parameters:
- `page` - Page number (default: 1)
- `limit` - Records per page (default: 10)
- `sort` - Sort field (default: created_at)
- `order` - Sort order (asc/desc, default: desc)

Response includes:
```json
{
  "data": [ /* records */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

---

**Last Updated**: January 2024
**API Version**: 1.0
**Status**: Production Ready
