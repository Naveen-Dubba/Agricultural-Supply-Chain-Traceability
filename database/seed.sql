-- Seed sample data
USE agritrace;

-- =========================================================
-- USERS
-- =========================================================

-- Admin User
INSERT INTO users
(full_name, email, phone, password, role, organization_name, location, is_verified)
VALUES
(
  'Admin User',
  'admin@agritrace.com',
  '1234567890',
  '$2a$10$YourHashedPasswordHere',
  'Admin',
  'AgriTrace',
  'Delhi',
  TRUE
);

-- Farmer Users
INSERT INTO users
(full_name, email, phone, password, role, organization_name, location, is_verified)
VALUES
(
  'Rajesh Kumar',
  'rajesh@farm.com',
  '9876543210',
  '$2a$10$YourHashedPasswordHere',
  'Farmer',
  'Kumar Farm',
  'Punjab',
  TRUE
),
(
  'Priya Singh',
  'priya@farm.com',
  '9876543211',
  '$2a$10$YourHashedPasswordHere',
  'Farmer',
  'Singh Agro',
  'Haryana',
  TRUE
),
(
  'Amit Patel',
  'amit@farm.com',
  '9876543212',
  '$2a$10$YourHashedPasswordHere',
  'Farmer',
  'Patel Fields',
  'Gujarat',
  TRUE
);

-- Collection Center Manager
INSERT INTO users
(full_name, email, phone, password, role, organization_name, location, is_verified)
VALUES
(
  'Vikram Gupta',
  'vikram@collection.com',
  '9876543213',
  '$2a$10$YourHashedPasswordHere',
  'CollectionCenterManager',
  'North Collection',
  'Delhi',
  TRUE
);

-- Quality Inspector
INSERT INTO users
(full_name, email, phone, password, role, organization_name, location, is_verified)
VALUES
(
  'Dr. Meena Verma',
  'meena@inspector.com',
  '9876543214',
  '$2a$10$YourHashedPasswordHere',
  'QualityInspector',
  'Quality Lab',
  'Delhi',
  TRUE
);

-- Warehouse Manager
INSERT INTO users
(full_name, email, phone, password, role, organization_name, location, is_verified)
VALUES
(
  'Suresh Sharma',
  'suresh@warehouse.com',
  '9876543215',
  '$2a$10$YourHashedPasswordHere',
  'WarehouseManager',
  'Central Warehouse',
  'Noida',
  TRUE
);

-- Logistics Provider User
INSERT INTO users
(full_name, email, phone, password, role, organization_name, location, is_verified)
VALUES
(
  'Arjun Transport',
  'arjun@logistics.com',
  '9876543216',
  '$2a$10$YourHashedPasswordHere',
  'LogisticsProvider',
  'Arjun Logistics',
  'Delhi',
  TRUE
);

-- Distributor User
INSERT INTO users
(full_name, email, phone, password, role, organization_name, location, is_verified)
VALUES
(
  'Global Distributors',
  'global@distribute.com',
  '9876543217',
  '$2a$10$YourHashedPasswordHere',
  'Distributor',
  'Global Dist Co',
  'Mumbai',
  TRUE
);

-- Retailer Users
INSERT INTO users
(full_name, email, phone, password, role, organization_name, location, is_verified)
VALUES
(
  'Fresh Mart Store',
  'freshmart@retail.com',
  '9876543218',
  '$2a$10$YourHashedPasswordHere',
  'Retailer',
  'Fresh Mart',
  'Delhi',
  TRUE
),
(
  'Organic Shop',
  'organic@retail.com',
  '9876543219',
  '$2a$10$YourHashedPasswordHere',
  'Retailer',
  'Organic Shop',
  'Bangalore',
  TRUE
);

-- =========================================================
-- FARMERS
-- =========================================================

INSERT INTO farmers
(user_id, farmer_id, farm_name, farm_location, farm_size, crop_types, verification_status)
VALUES
(
  2,
  'FARM-001',
  'Kumar Farm',
  'Amritsar, Punjab',
  50.5,
  'Wheat, Rice, Cotton',
  'Verified'
),
(
  3,
  'FARM-002',
  'Singh Agro',
  'Faridabad, Haryana',
  35.0,
  'Tomato, Onion, Potato',
  'Verified'
),
(
  4,
  'FARM-003',
  'Patel Fields',
  'Ahmedabad, Gujarat',
  60.0,
  'Cotton, Groundnut, Sesame',
  'Verified'
);

-- =========================================================
-- COLLECTION CENTERS
-- =========================================================

INSERT INTO collection_centers
(center_id, center_name, location, manager_id, contact, capacity, current_stock, status)
VALUES
(
  'CC-001',
  'North Collection Center',
  'Delhi',
  5,
  '9876543220',
  1000.0,
  250.0,
  'Active'
),
(
  'CC-002',
  'East Collection Center',
  'Noida',
  5,
  '9876543221',
  800.0,
  150.0,
  'Active'
);

-- =========================================================
-- PRODUCE BATCHES
-- =========================================================

INSERT INTO produce_batches
(
  batch_id,
  product_name,
  product_category,
  crop_variety,
  farmer_id,
  farm_location,
  harvest_date,
  quantity,
  unit,
  cultivation_type,
  organic_status,
  current_stage,
  status,
  qr_code
)
VALUES
(
  'AGRI-2026-0001',
  'Wheat',
  'Grains',
  'HD2967',
  1,
  'Amritsar, Punjab',
  '2026-06-15',
  500.0,
  'kg',
  'Conventional',
  'Conventional',
  'Warehouse',
  'Processing',
  'data:image/png;base64,iVBORw0KGgo='
),
(
  'AGRI-2026-0002',
  'Tomato',
  'Vegetables',
  'Roma',
  2,
  'Faridabad, Haryana',
  '2026-08-20',
  300.0,
  'kg',
  'Conventional',
  'Conventional',
  'Distributor',
  'Processing',
  'data:image/png;base64,iVBORw0KGgo='
),
(
  'AGRI-2026-0003',
  'Cotton',
  'Cash Crops',
  'Bt Cotton',
  3,
  'Ahmedabad, Gujarat',
  '2026-08-01',
  150.0,
  'bales',
  'Conventional',
  'Conventional',
  'Collection',
  'Pending',
  'data:image/png;base64,iVBORw0KGgo='
);

-- =========================================================
-- COLLECTION RECORDS
-- =========================================================

INSERT INTO collection_records
(
  batch_id,
  collection_center_id,
  arrival_date,
  arrival_time,
  received_quantity,
  received_by,
  initial_condition,
  storage_location
)
VALUES
(
  1,
  1,
  '2026-06-20',
  '10:30:00',
  500.0,
  5,
  'Good',
  'Rack A1'
),
(
  2,
  1,
  '2026-08-25',
  '14:45:00',
  300.0,
  5,
  'Excellent',
  'Rack B2'
);

-- =========================================================
-- QUALITY INSPECTIONS
-- =========================================================

INSERT INTO quality_inspections
(
  inspection_id,
  batch_id,
  inspector_id,
  inspection_date,
  product_condition,
  color,
  size,
  freshness,
  moisture_level,
  temperature,
  damage_percentage,
  contamination_status,
  quality_grade,
  inspection_result
)
VALUES
(
  'INSP-001',
  1,
  6,
  '2026-06-21',
  'Good',
  'Golden',
  'Medium',
  'Fresh',
  12.5,
  25.0,
  0.5,
  'None',
  'Grade A',
  'Approved'
),
(
  'INSP-002',
  2,
  6,
  '2026-08-26',
  'Excellent',
  'Red',
  'Medium',
  'Very Fresh',
  8.0,
  22.0,
  0.0,
  'None',
  'Grade A',
  'Approved'
);

-- =========================================================
-- WAREHOUSES
-- =========================================================

INSERT INTO warehouses
(
  warehouse_id,
  warehouse_name,
  location,
  manager_id,
  capacity,
  available_capacity,
  temperature,
  humidity,
  status
)
VALUES
(
  'WH-001',
  'Central Warehouse Delhi',
  'Noida',
  7,
  5000.0,
  4500.0,
  15.0,
  65.0,
  'Active'
),
(
  'WH-002',
  'Regional Warehouse',
  'Pune',
  7,
  3000.0,
  2800.0,
  18.0,
  60.0,
  'Active'
);

-- =========================================================
-- INVENTORY
-- =========================================================

INSERT INTO inventory
(
  inventory_id,
  batch_id,
  warehouse_id,
  quantity_received,
  current_quantity,
  storage_date,
  storage_location,
  expiry_date,
  stock_status
)
VALUES
(
  'INV-001',
  1,
  1,
  500.0,
  500.0,
  '2026-06-22',
  'Shelf 1',
  '2027-06-15',
  'In Stock'
),
(
  'INV-002',
  2,
  1,
  300.0,
  280.0,
  '2026-08-27',
  'Shelf 2',
  '2026-10-15',
  'In Stock'
);

-- =========================================================
-- LOGISTICS PROVIDERS
-- User ID 8 = Logistics Provider
-- =========================================================

INSERT INTO logistics_providers
(
  provider_id,
  user_id,
  provider_name,
  company_name,
  contact,
  email,
  location
)
VALUES
(
  'LOG-001',
  8,
  'Arjun Transport',
  'Arjun Logistics Pvt Ltd',
  '9876543216',
  'arjun@logistics.com',
  'Delhi'
);

-- =========================================================
-- SHIPMENTS
-- logistics_provider_id = logistics_providers.id
-- First logistics provider has id = 1
-- =========================================================

INSERT INTO shipments
(
  shipment_id,
  batch_id,
  logistics_provider_id,
  vehicle_number,
  driver_name,
  driver_phone,
  origin,
  destination,
  dispatch_date,
  expected_delivery_date,
  transport_temperature,
  shipment_status
)
VALUES
(
  'SHIP-001',
  1,
  1,
  'MH-01-AB-1234',
  'Ravi Kumar',
  '9876543225',
  'Delhi',
  'Mumbai',
  '2026-07-10',
  '2026-07-15',
  15.0,
  'Delivered'
),
(
  'SHIP-002',
  2,
  1,
  'MH-01-AB-1235',
  'Pawan Singh',
  '9876543226',
  'Delhi',
  'Bangalore',
  '2026-09-01',
  '2026-09-05',
  18.0,
  'In Transit'
);

-- =========================================================
-- DISTRIBUTORS
-- User ID 9 = Distributor
-- =========================================================

INSERT INTO distributors
(
  distributor_id,
  user_id,
  distributor_name,
  company,
  contact,
  email,
  location
)
VALUES
(
  'DIST-001',
  9,
  'Global Distributors',
  'Global Dist Co',
  '9876543217',
  'global@distribute.com',
  'Mumbai'
);

-- =========================================================
-- DISTRIBUTION RECORDS
-- distributor_id references distributors.id
-- First distributor has id = 1
-- =========================================================

INSERT INTO distribution_records
(
  batch_id,
  distributor_id,
  quantity_received,
  receiving_date,
  quantity_distributed,
  destination_retailer
)
VALUES
(
  1,
  1,
  500.0,
  '2026-07-15',
  400.0,
  'Multiple Retailers'
);

-- =========================================================
-- RETAILERS
-- User IDs:
-- 10 = Fresh Mart
-- 11 = Organic Shop
-- =========================================================

INSERT INTO retailers
(
  retailer_id,
  user_id,
  store_name,
  owner_name,
  contact,
  email,
  address,
  city,
  state
)
VALUES
(
  'RET-001',
  10,
  'Fresh Mart',
  'Raj Sharma',
  '9876543218',
  'freshmart@retail.com',
  '123 Market St',
  'Delhi',
  'Delhi'
),
(
  'RET-002',
  11,
  'Organic Shop',
  'Priya Nair',
  '9876543219',
  'organic@retail.com',
  '456 Green Ave',
  'Bangalore',
  'Karnataka'
);

-- =========================================================
-- RETAILER INVENTORY
-- retailer_id references retailers.id
-- =========================================================

INSERT INTO retailer_inventory
(
  batch_id,
  retailer_id,
  quantity_received,
  quantity_available,
  received_date,
  selling_status
)
VALUES
(
  1,
  1,
  250.0,
  180.0,
  '2026-07-20',
  'Available'
),
(
  2,
  2,
  150.0,
  120.0,
  '2026-09-01',
  'Available'
);

-- =========================================================
-- TRACEABILITY EVENTS
-- =========================================================

INSERT INTO traceability_events
(
  event_id,
  batch_id,
  event_type,
  location,
  user_id,
  event_date,
  event_time,
  description,
  status
)
VALUES
(
  'EVT-001',
  1,
  'Produce Registered',
  'Amritsar, Punjab',
  2,
  '2026-06-15',
  '09:00:00',
  'Wheat batch registered by farmer',
  'Completed'
),
(
  'EVT-002',
  1,
  'Collected',
  'Delhi',
  5,
  '2026-06-20',
  '10:30:00',
  'Batch collected at collection center',
  'Completed'
),
(
  'EVT-003',
  1,
  'Quality Inspected',
  'Delhi',
  6,
  '2026-06-21',
  '14:00:00',
  'Quality inspection completed - Grade A',
  'Completed'
),
(
  'EVT-004',
  1,
  'Stored',
  'Noida',
  7,
  '2026-06-22',
  '15:00:00',
  'Stored in Central Warehouse',
  'Completed'
),
(
  'EVT-005',
  1,
  'Dispatched',
  'Delhi',
  8,
  '2026-07-10',
  '08:00:00',
  'Shipment dispatched to Mumbai',
  'Completed'
),
(
  'EVT-006',
  1,
  'In Transit',
  'Highway',
  8,
  '2026-07-12',
  '10:00:00',
  'In transit to destination',
  'Completed'
),
(
  'EVT-007',
  1,
  'Delivered to Distributor',
  'Mumbai',
  9,
  '2026-07-15',
  '16:00:00',
  'Delivered to distributor',
  'Completed'
),
(
  'EVT-008',
  1,
  'Delivered to Retailer',
  'Delhi',
  10,
  '2026-07-20',
  '11:00:00',
  'Delivered to Fresh Mart',
  'Completed'
);

-- =========================================================
-- NOTIFICATIONS
-- =========================================================

INSERT INTO notifications
(
  notification_id,
  user_id,
  title,
  message,
  type,
  is_read
)
VALUES
(
  'NOTIF-001',
  1,
  'New Batch Registered',
  'Farmer Rajesh Kumar registered wheat batch AGRI-2026-0001',
  'Info',
  TRUE
),
(
  'NOTIF-002',
  6,
  'Quality Inspection Due',
  'Tomato batch AGRI-2026-0002 awaiting inspection',
  'Warning',
  FALSE
),
(
  'NOTIF-003',
  7,
  'Low Stock Alert',
  'Warehouse inventory for AGRI-2026-0001 below threshold',
  'Warning',
  FALSE
),
(
  'NOTIF-004',
  8,
  'Shipment Delayed',
  'Shipment SHIP-002 experiencing delays',
  'Error',
  FALSE
);