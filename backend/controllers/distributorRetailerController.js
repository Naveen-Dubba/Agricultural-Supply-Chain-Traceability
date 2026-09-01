import pool from '../config/database.js';

// Get all distributors
export const getAllDistributors = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [distributors] = await connection.query(`
      SELECT d.*, u.email, u.phone
      FROM distributors d
      JOIN users u ON d.distributor_id = u.id
      ORDER BY d.created_at DESC
    `);
    connection.release();
    res.json(distributors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching distributors', error: error.message });
  }
};

// Get all retailers
export const getAllRetailers = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [retailers] = await connection.query(`
      SELECT r.*, u.email, u.phone
      FROM retailers r
      JOIN users u ON r.retailer_id = u.id
      ORDER BY r.created_at DESC
    `);
    connection.release();
    res.json(retailers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching retailers', error: error.message });
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
