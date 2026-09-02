import pool from '../config/database.js';

// Get all distributors
export const getAllDistributors = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [distributors] = await connection.query(`
      SELECT d.*, u.email, u.phone
      FROM distributors d
      JOIN users u ON d.user_id = u.id
      ORDER BY d.created_at DESC
    `);
    connection.release();
    res.json(distributors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching distributors', error: error.message });
  }
};

// Get distributor by ID
export const getDistributorById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [distributors] = await connection.query(`
      SELECT d.*, u.email, u.phone
      FROM distributors d
      JOIN users u ON d.user_id = u.id
      WHERE d.id = ?
    `, [id]);

    if (distributors.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Distributor not found' });
    }

    connection.release();
    res.json(distributors[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching distributor', error: error.message });
  }
};

// Add distributor
export const addDistributor = async (req, res) => {
  try {
    const { userId, distributorName, company, contact, email, location } = req.body;

    if (!userId || !distributorName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    const distributorId = `DIST-${Math.floor(Math.random() * 9999) + 1}`;

    await connection.query(
      `INSERT INTO distributors (user_id, distributor_id, distributor_name, company, contact, email, location, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'Active')`,
      [userId, distributorId, distributorName, company || null, contact || null, email || null, location || null]
    );

    connection.release();
    res.status(201).json({ message: 'Distributor added successfully', distributorId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding distributor', error: error.message });
  }
};

// Update distributor
export const updateDistributor = async (req, res) => {
  try {
    const { id } = req.params;
    const { distributorName, company, contact, email, location, status } = req.body;

    const connection = await pool.getConnection();
    await connection.query(
      `UPDATE distributors
       SET distributor_name = ?, company = ?, contact = ?, email = ?, location = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [distributorName, company, contact, email, location, status, id]
    );

    connection.release();
    res.json({ message: 'Distributor updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating distributor', error: error.message });
  }
};

// Delete distributor
export const deleteDistributor = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM distributors WHERE id = ?', [id]);
    connection.release();
    res.json({ message: 'Distributor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting distributor', error: error.message });
  }
};

// Get all retailers
export const getAllRetailers = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [retailers] = await connection.query(`
      SELECT r.*, u.email, u.phone
      FROM retailers r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
    `);
    connection.release();
    res.json(retailers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching retailers', error: error.message });
  }
};

// Get retailer by ID
export const getRetailerById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [retailers] = await connection.query(`
      SELECT r.*, u.email, u.phone
      FROM retailers r
      JOIN users u ON r.user_id = u.id
      WHERE r.id = ?
    `, [id]);

    if (retailers.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Retailer not found' });
    }

    connection.release();
    res.json(retailers[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching retailer', error: error.message });
  }
};

// Add retailer
export const addRetailer = async (req, res) => {
  try {
    const { userId, storeName, ownerName, contact, email, address, city, state } = req.body;

    if (!userId || !storeName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    const retailerId = `RET-${Math.floor(Math.random() * 9999) + 1}`;

    await connection.query(
      `INSERT INTO retailers (user_id, retailer_id, store_name, owner_name, contact, email, address, city, state, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')`,
      [userId, retailerId, storeName, ownerName || null, contact || null, email || null, address || null, city || null, state || null]
    );

    connection.release();
    res.status(201).json({ message: 'Retailer added successfully', retailerId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding retailer', error: error.message });
  }
};

// Update retailer
export const updateRetailer = async (req, res) => {
  try {
    const { id } = req.params;
    const { storeName, ownerName, contact, email, address, city, state, status } = req.body;

    const connection = await pool.getConnection();
    await connection.query(
      `UPDATE retailers
       SET store_name = ?, owner_name = ?, contact = ?, email = ?, address = ?, city = ?, state = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [storeName, ownerName, contact, email, address, city, state, status, id]
    );

    connection.release();
    res.json({ message: 'Retailer updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating retailer', error: error.message });
  }
};

// Delete retailer
export const deleteRetailer = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM retailers WHERE id = ?', [id]);
    connection.release();
    res.json({ message: 'Retailer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting retailer', error: error.message });
  }
};

// Get retailer inventory
export const getRetailerInventory = async (req, res) => {
  try {
    const { retailerId } = req.params;
    const connection = await pool.getConnection();
    const [inventory] = await connection.query(`
      SELECT ri.*, pb.batch_id, pb.product_name, pb.product_category
      FROM retailer_inventory ri
      JOIN produce_batches pb ON ri.batch_id = pb.id
      WHERE ri.retailer_id = ?
      ORDER BY ri.created_at DESC
    `, [retailerId]);

    connection.release();
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching retailer inventory', error: error.message });
  }
};

// Add retailer inventory
export const addRetailerInventory = async (req, res) => {
  try {
    const { batchId, retailerId, quantityReceived, receivedDate } = req.body;

    if (!batchId || !retailerId || !quantityReceived) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    await connection.query(
      `INSERT INTO retailer_inventory (batch_id, retailer_id, quantity_received, quantity_available, received_date)
       VALUES (?, ?, ?, ?, ?)`,
      [batchId, retailerId, quantityReceived, quantityReceived, receivedDate || new Date().toISOString().split('T')[0]]
    );

    connection.release();
    res.status(201).json({ message: 'Retailer inventory added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding retailer inventory', error: error.message });
  }
};
