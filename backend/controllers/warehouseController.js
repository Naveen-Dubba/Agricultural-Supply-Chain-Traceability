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
