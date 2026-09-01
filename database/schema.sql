-- Create database
CREATE DATABASE IF NOT EXISTS agritrace;
USE agritrace;

-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  role ENUM(
    'Admin',
    'Farmer',
    'CollectionCenterManager',
    'QualityInspector',
    'WarehouseManager',
    'LogisticsProvider',
    'Distributor',
    'Retailer',
    'Consumer'
  ) NOT NULL,
  organization_name VARCHAR(100),
  location VARCHAR(150),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- Farmers table
CREATE TABLE farmers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  farmer_id VARCHAR(50) UNIQUE NOT NULL,
  farm_name VARCHAR(150) NOT NULL,
  farm_location VARCHAR(200) NOT NULL,
  farm_size DECIMAL(10, 2),
  crop_types VARCHAR(255),
  verification_status ENUM(
    'Pending',
    'Verified',
    'Rejected'
  ) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  INDEX idx_farmer_id (farmer_id),
  INDEX idx_verification_status (verification_status),
  INDEX idx_farmer_user_id (user_id)
);

-- Collection Centers table
CREATE TABLE collection_centers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  center_id VARCHAR(50) UNIQUE NOT NULL,
  center_name VARCHAR(150) NOT NULL,
  location VARCHAR(200) NOT NULL,
  manager_id INT,
  contact VARCHAR(20),
  capacity DECIMAL(15, 2),
  current_stock DECIMAL(15, 2) DEFAULT 0,
  status ENUM(
    'Active',
    'Inactive'
  ) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (manager_id)
    REFERENCES users(id)
    ON DELETE SET NULL,

  INDEX idx_center_id (center_id),
  INDEX idx_center_manager_id (manager_id)
);

-- Produce Batches table
CREATE TABLE produce_batches (
  id INT PRIMARY KEY AUTO_INCREMENT,
  batch_id VARCHAR(50) UNIQUE NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  product_category VARCHAR(100) NOT NULL,
  crop_variety VARCHAR(100),
  farmer_id INT NOT NULL,
  farm_location VARCHAR(200),
  harvest_date DATE NOT NULL,
  quantity DECIMAL(15, 2) NOT NULL,
  unit VARCHAR(20),
  cultivation_type VARCHAR(50),
  organic_status ENUM(
    'Organic',
    'Conventional'
  ) DEFAULT 'Conventional',
  initial_quality_grade ENUM(
    'Grade A',
    'Grade B',
    'Grade C',
    'Rejected'
  ),
  storage_requirement VARCHAR(100),
  expected_shelf_life INT,
  current_stage VARCHAR(100),
  status ENUM(
    'Pending',
    'Processing',
    'Completed',
    'Rejected'
  ) DEFAULT 'Pending',
  notes TEXT,
  qr_code TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (farmer_id)
    REFERENCES farmers(id)
    ON DELETE CASCADE,

  INDEX idx_batch_id (batch_id),
  INDEX idx_farmer_id (farmer_id),
  INDEX idx_status (status)
);

-- Collection Records table
CREATE TABLE collection_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  batch_id INT NOT NULL,
  collection_center_id INT NOT NULL,
  arrival_date DATE NOT NULL,
  arrival_time TIME,
  received_quantity DECIMAL(15, 2),
  received_by INT,
  initial_condition VARCHAR(100),
  storage_location VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (batch_id)
    REFERENCES produce_batches(id)
    ON DELETE CASCADE,

  FOREIGN KEY (collection_center_id)
    REFERENCES collection_centers(id)
    ON DELETE CASCADE,

  FOREIGN KEY (received_by)
    REFERENCES users(id)
    ON DELETE SET NULL,

  INDEX idx_batch_id (batch_id),
  INDEX idx_collection_center_id (collection_center_id),
  INDEX idx_received_by (received_by)
);

-- Quality Inspections table
CREATE TABLE quality_inspections (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inspection_id VARCHAR(50) UNIQUE NOT NULL,
  batch_id INT NOT NULL,
  inspector_id INT NOT NULL,
  inspection_date DATE NOT NULL,
  product_condition VARCHAR(50),
  color VARCHAR(50),
  size VARCHAR(50),
  freshness VARCHAR(50),
  moisture_level DECIMAL(5, 2),
  temperature DECIMAL(5, 2),
  damage_percentage DECIMAL(5, 2),
  contamination_status VARCHAR(50),
  quality_grade ENUM(
    'Grade A',
    'Grade B',
    'Grade C',
    'Rejected'
  ) NOT NULL,
  inspection_result ENUM(
    'Approved',
    'Conditional Approval',
    'Rejected'
  ) NOT NULL,
  remarks TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (batch_id)
    REFERENCES produce_batches(id)
    ON DELETE CASCADE,

  FOREIGN KEY (inspector_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  INDEX idx_quality_batch_id (batch_id),
  INDEX idx_inspection_id (inspection_id),
  INDEX idx_inspector_id (inspector_id)
);

-- Warehouses table
CREATE TABLE warehouses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  warehouse_id VARCHAR(50) UNIQUE NOT NULL,
  warehouse_name VARCHAR(150) NOT NULL,
  location VARCHAR(200) NOT NULL,
  manager_id INT,
  capacity DECIMAL(15, 2),
  available_capacity DECIMAL(15, 2),
  temperature DECIMAL(5, 2),
  humidity DECIMAL(5, 2),
  status ENUM(
    'Active',
    'Inactive'
  ) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (manager_id)
    REFERENCES users(id)
    ON DELETE SET NULL,

  INDEX idx_warehouse_id (warehouse_id),
  INDEX idx_warehouse_manager_id (manager_id)
);

-- Inventory table
CREATE TABLE inventory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inventory_id VARCHAR(50) UNIQUE NOT NULL,
  batch_id INT NOT NULL,
  warehouse_id INT NOT NULL,
  quantity_received DECIMAL(15, 2),
  current_quantity DECIMAL(15, 2),
  storage_date DATE,
  storage_location VARCHAR(100),
  expiry_date DATE,
  stock_status ENUM(
    'In Stock',
    'Low Stock',
    'Expired',
    'Disposed'
  ) DEFAULT 'In Stock',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (batch_id)
    REFERENCES produce_batches(id)
    ON DELETE CASCADE,

  FOREIGN KEY (warehouse_id)
    REFERENCES warehouses(id)
    ON DELETE CASCADE,

  INDEX idx_inventory_batch_id (batch_id),
  INDEX idx_inventory_warehouse_id (warehouse_id)
);

-- Inventory Transactions table
CREATE TABLE inventory_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inventory_id INT NOT NULL,
  transaction_type ENUM(
    'Entry',
    'Exit',
    'Transfer'
  ) NOT NULL,
  quantity DECIMAL(15, 2) NOT NULL,
  from_warehouse_id INT,
  to_warehouse_id INT,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  performed_by INT,
  notes TEXT,

  FOREIGN KEY (inventory_id)
    REFERENCES inventory(id)
    ON DELETE CASCADE,

  FOREIGN KEY (from_warehouse_id)
    REFERENCES warehouses(id)
    ON DELETE SET NULL,

  FOREIGN KEY (to_warehouse_id)
    REFERENCES warehouses(id)
    ON DELETE SET NULL,

  FOREIGN KEY (performed_by)
    REFERENCES users(id)
    ON DELETE SET NULL,

  INDEX idx_inventory_transaction_inventory_id (inventory_id),
  INDEX idx_from_warehouse_id (from_warehouse_id),
  INDEX idx_to_warehouse_id (to_warehouse_id),
  INDEX idx_performed_by (performed_by)
);

-- Logistics Providers table
CREATE TABLE logistics_providers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  provider_id VARCHAR(50) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  provider_name VARCHAR(150) NOT NULL,
  company_name VARCHAR(150),
  contact VARCHAR(20),
  email VARCHAR(100),
  location VARCHAR(200),
  status ENUM(
    'Active',
    'Inactive'
  ) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  INDEX idx_provider_id (provider_id),
  INDEX idx_provider_user_id (user_id)
);

-- Shipments table
CREATE TABLE shipments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  shipment_id VARCHAR(50) UNIQUE NOT NULL,
  batch_id INT NOT NULL,
  logistics_provider_id INT,
  vehicle_number VARCHAR(50),
  driver_name VARCHAR(100),
  driver_phone VARCHAR(20),
  origin VARCHAR(200),
  destination VARCHAR(200),
  dispatch_date DATE,
  expected_delivery_date DATE,
  actual_delivery_date DATE,
  transport_temperature DECIMAL(5, 2),
  transport_condition VARCHAR(100),
  shipment_status ENUM(
    'Scheduled',
    'Dispatched',
    'In Transit',
    'Delayed',
    'Delivered',
    'Cancelled'
  ) DEFAULT 'Scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (batch_id)
    REFERENCES produce_batches(id)
    ON DELETE CASCADE,

  FOREIGN KEY (logistics_provider_id)
    REFERENCES logistics_providers(id)
    ON DELETE SET NULL,

  INDEX idx_shipment_id (shipment_id),
  INDEX idx_shipment_batch_id (batch_id),
  INDEX idx_shipment_provider_id (logistics_provider_id),
  INDEX idx_shipment_status (shipment_status)
);

-- Distributors table
CREATE TABLE distributors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  distributor_id VARCHAR(50) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  distributor_name VARCHAR(150) NOT NULL,
  company VARCHAR(150),
  contact VARCHAR(20),
  email VARCHAR(100),
  location VARCHAR(200),
  status ENUM(
    'Active',
    'Inactive'
  ) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  INDEX idx_distributor_id (distributor_id),
  INDEX idx_distributor_user_id (user_id)
);

-- Distribution Records table
CREATE TABLE distribution_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  batch_id INT NOT NULL,
  distributor_id INT NOT NULL,
  quantity_received DECIMAL(15, 2),
  receiving_date DATE,
  quantity_distributed DECIMAL(15, 2),
  destination_retailer VARCHAR(100),
  distribution_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (batch_id)
    REFERENCES produce_batches(id)
    ON DELETE CASCADE,

  FOREIGN KEY (distributor_id)
    REFERENCES distributors(id)
    ON DELETE CASCADE,

  INDEX idx_distribution_batch_id (batch_id),
  INDEX idx_distribution_distributor_id (distributor_id)
);

-- Retailers table
CREATE TABLE retailers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  retailer_id VARCHAR(50) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  store_name VARCHAR(150) NOT NULL,
  owner_name VARCHAR(100),
  contact VARCHAR(20),
  email VARCHAR(100),
  address VARCHAR(255),
  city VARCHAR(50),
  state VARCHAR(50),
  status ENUM(
    'Active',
    'Inactive'
  ) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  INDEX idx_retailer_id (retailer_id),
  INDEX idx_retailer_user_id (user_id)
);

-- Retailer Inventory table
CREATE TABLE retailer_inventory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  batch_id INT NOT NULL,
  retailer_id INT NOT NULL,
  quantity_received DECIMAL(15, 2),
  quantity_available DECIMAL(15, 2),
  received_date DATE,
  selling_status ENUM(
    'Available',
    'Sold Out',
    'Expired'
  ) DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (batch_id)
    REFERENCES produce_batches(id)
    ON DELETE CASCADE,

  FOREIGN KEY (retailer_id)
    REFERENCES retailers(id)
    ON DELETE CASCADE,

  INDEX idx_retail_inventory_batch_id (batch_id),
  INDEX idx_retail_inventory_retailer_id (retailer_id)
);

-- Traceability Events table
CREATE TABLE traceability_events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id VARCHAR(50) UNIQUE NOT NULL,
  batch_id INT NOT NULL,
  event_type ENUM(
    'Produce Registered',
    'Harvested',
    'Collected',
    'Quality Inspected',
    'Stored',
    'Dispatched',
    'In Transit',
    'Delivered to Distributor',
    'Delivered to Retailer',
    'Sold'
  ) NOT NULL,
  location VARCHAR(200),
  user_id INT,
  event_date DATE,
  event_time TIME,
  description TEXT,
  status ENUM(
    'Pending',
    'Completed',
    'Failed'
  ) DEFAULT 'Completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (batch_id)
    REFERENCES produce_batches(id)
    ON DELETE CASCADE,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL,

  INDEX idx_trace_batch_id (batch_id),
  INDEX idx_event_type (event_type),
  INDEX idx_event_id (event_id),
  INDEX idx_trace_user_id (user_id)
);

-- Notifications table
CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  notification_id VARCHAR(50) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type ENUM(
    'Info',
    'Warning',
    'Error',
    'Success'
  ) DEFAULT 'Info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  INDEX idx_notification_user_id (user_id),
  INDEX idx_is_read (is_read)
);

-- Additional indexes
CREATE INDEX idx_users_created_at
ON users(created_at);

CREATE INDEX idx_produce_batches_created_at
ON produce_batches(created_at);

CREATE INDEX idx_shipments_created_at
ON shipments(created_at);