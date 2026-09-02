import pool from '../config/database.js';

// Get all warehouses
export const getAllWarehouses = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [warehouses] = await connection.query(`
      SELECT w.*, u.full_name as manager_name
      FROM warehouses w
      LEFT JOIN users u ON w.manager_id = u.id
      ORDER BY w.created_at DESC
    `);
    connection.release();
    res.json(warehouses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching warehouses', error: error.message });
  }
};

// Get warehouse by ID
export const getWarehouseById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [warehouses] = await connection.query(`
      SELECT w.*, u.full_name as manager_name
      FROM warehouses w
      LEFT JOIN users u ON w.manager_id = u.id
      WHERE w.id = ?
    `, [id]);

    if (warehouses.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    connection.release();
    res.json(warehouses[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching warehouse', error: error.message });
  }
};

// Add warehouse
export const addWarehouse = async (req, res) => {
  try {
    const { warehouseName, location, managerId, capacity, temperature, humidity } = req.body;

    if (!warehouseName || !location || !capacity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    const warehouseId = `WH-${Math.floor(Math.random() * 9999) + 1}`;

    await connection.query(
      `INSERT INTO warehouses 
       (warehouse_id, warehouse_name, location, manager_id, capacity, available_capacity, temperature, humidity)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [warehouseId, warehouseName, location, managerId || null, capacity, capacity, temperature || null, humidity || null]
    );

    connection.release();
    res.status(201).json({ message: 'Warehouse added successfully', warehouseId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding warehouse', error: error.message });
  }
};

// Update warehouse
export const updateWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { warehouseName, location, managerId, capacity, availableCapacity, temperature, humidity, status } = req.body;

    const connection = await pool.getConnection();
    await connection.query(
      `UPDATE warehouses
       SET warehouse_name = ?, location = ?, manager_id = ?, capacity = ?, available_capacity = ?,
           temperature = ?, humidity = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [warehouseName, location, managerId, capacity, availableCapacity, temperature, humidity, status, id]
    );

    connection.release();
    res.json({ message: 'Warehouse updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating warehouse', error: error.message });
  }
};

// Delete warehouse
export const deleteWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM warehouses WHERE id = ?', [id]);
    connection.release();
    res.json({ message: 'Warehouse deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting warehouse', error: error.message });
  }
};

// Get inventory for warehouse
export const getWarehouseInventory = async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const connection = await pool.getConnection();
    const [inventory] = await connection.query(`
      SELECT i.*, pb.batch_id, pb.product_name, pb.quantity
      FROM inventory i
      JOIN produce_batches pb ON i.batch_id = pb.id
      WHERE i.warehouse_id = ?
      ORDER BY i.created_at DESC
    `, [warehouseId]);

    connection.release();
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching inventory', error: error.message });
  }
};

// Add inventory (Stock In)
export const addInventory = async (req, res) => {
  try {
    const { batchId, warehouseId, quantityReceived, storageLocation, expiryDate } = req.body;

    if (!batchId || !warehouseId || !quantityReceived) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    const inventoryId = `INV-${Math.floor(Math.random() * 999999) + 1}`;

    await connection.query(
      `INSERT INTO inventory (inventory_id, batch_id, warehouse_id, quantity_received, current_quantity, storage_date, storage_location, expiry_date, stock_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'In Stock')`,
      [inventoryId, batchId, warehouseId, quantityReceived, quantityReceived, new Date().toISOString().split('T')[0], storageLocation || null, expiryDate || null]
    );

    // Update warehouse available capacity
    const [warehouse] = await connection.query('SELECT available_capacity FROM warehouses WHERE id = ?', [warehouseId]);
    if (warehouse.length > 0) {
      const newCapacity = warehouse[0].available_capacity - quantityReceived;
      await connection.query('UPDATE warehouses SET available_capacity = ? WHERE id = ?', [newCapacity, warehouseId]);
    }

    connection.release();
    res.status(201).json({ message: 'Inventory added successfully', inventoryId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding inventory', error: error.message });
  }
};

// Update inventory quantity (Stock Out)
export const updateInventoryQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantityRemoved, warehouseId } = req.body;

    if (!quantityRemoved) {
      return res.status(400).json({ message: 'Quantity required' });
    }

    const connection = await pool.getConnection();
    
    const [inventory] = await connection.query('SELECT current_quantity FROM inventory WHERE id = ?', [id]);
    if (inventory.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Inventory not found' });
    }

    const newQuantity = inventory[0].current_quantity - quantityRemoved;
    if (newQuantity < 0) {
      connection.release();
      return res.status(400).json({ message: 'Insufficient inventory' });
    }

    await connection.query(
      'UPDATE inventory SET current_quantity = ? WHERE id = ?',
      [newQuantity, id]
    );

    // Update warehouse available capacity
    if (warehouseId) {
      const [warehouse] = await connection.query('SELECT available_capacity FROM warehouses WHERE id = ?', [warehouseId]);
      if (warehouse.length > 0) {
        const newCapacity = warehouse[0].available_capacity + quantityRemoved;
        await connection.query('UPDATE warehouses SET available_capacity = ? WHERE id = ?', [newCapacity, warehouseId]);
      }
    }

    connection.release();
    res.json({ message: 'Inventory updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating inventory', error: error.message });
  }
};

// Transfer inventory between warehouses
export const transferInventory = async (req, res) => {
  try {
    const { inventoryId, fromWarehouseId, toWarehouseId, quantity, performedBy } = req.body;

    if (!inventoryId || !fromWarehouseId || !toWarehouseId || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();

    const [inventory] = await connection.query('SELECT batch_id, current_quantity FROM inventory WHERE id = ?', [inventoryId]);
    if (inventory.length === 0 || inventory[0].current_quantity < quantity) {
      connection.release();
      return res.status(400).json({ message: 'Insufficient inventory to transfer' });
    }

    // Reduce from source warehouse
    await connection.query(
      'UPDATE inventory SET current_quantity = current_quantity - ? WHERE id = ?',
      [quantity, inventoryId]
    );

    // Add to destination warehouse
    const toInvId = `INV-${Math.floor(Math.random() * 999999) + 1}`;
    await connection.query(
      `INSERT INTO inventory (inventory_id, batch_id, warehouse_id, quantity_received, current_quantity, storage_date, stock_status)
       VALUES (?, ?, ?, ?, ?, ?, 'In Stock')`,
      [toInvId, inventory[0].batch_id, toWarehouseId, quantity, quantity, new Date().toISOString().split('T')[0]]
    );

    // Record transaction
    await connection.query(
      `INSERT INTO inventory_transactions (inventory_id, transaction_type, quantity, from_warehouse_id, to_warehouse_id, performed_by)
       VALUES (?, 'Transfer', ?, ?, ?, ?)`,
      [inventoryId, quantity, fromWarehouseId, toWarehouseId, performedBy || null]
    );

    // Update warehouse capacities
    const [fromWh] = await connection.query('SELECT available_capacity FROM warehouses WHERE id = ?', [fromWarehouseId]);
    const [toWh] = await connection.query('SELECT available_capacity FROM warehouses WHERE id = ?', [toWarehouseId]);
    
    if (fromWh.length > 0) {
      await connection.query('UPDATE warehouses SET available_capacity = ? WHERE id = ?', [fromWh[0].available_capacity + quantity, fromWarehouseId]);
    }
    if (toWh.length > 0) {
      await connection.query('UPDATE warehouses SET available_capacity = ? WHERE id = ?', [toWh[0].available_capacity - quantity, toWarehouseId]);
    }

    connection.release();
    res.json({ message: 'Inventory transferred successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error transferring inventory', error: error.message });
  }
};
