import pool from '../config/database.js';

// Get all farmers
export const getAllFarmers = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [farmers] = await connection.query(`
      SELECT f.*, u.full_name, u.email, u.phone
      FROM farmers f
      JOIN users u ON f.user_id = u.id
      ORDER BY f.created_at DESC
    `);
    connection.release();
    res.json(farmers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching farmers', error: error.message });
  }
};

// Get farmer by ID
export const getFarmerById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [farmers] = await connection.query(`
      SELECT f.*, u.full_name, u.email, u.phone
      FROM farmers f
      JOIN users u ON f.user_id = u.id
      WHERE f.id = ?
    `, [id]);

    if (farmers.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Farmer not found' });
    }

    connection.release();
    res.json(farmers[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching farmer', error: error.message });
  }
};

// Add farmer
export const addFarmer = async (req, res) => {
  try {
    const { userId, farmName, farmLocation, farmSize, cropTypes } = req.body;

    if (!userId || !farmName || !farmLocation) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();

    const farmerId = `FARM-${Math.floor(Math.random() * 9999) + 1}`;

    await connection.query(
      'INSERT INTO farmers (user_id, farmer_id, farm_name, farm_location, farm_size, crop_types) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, farmerId, farmName, farmLocation, farmSize || null, cropTypes || '']
    );

    connection.release();
    res.status(201).json({ message: 'Farmer added successfully', farmerId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding farmer', error: error.message });
  }
};

// Update farmer
export const updateFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const { farmName, farmLocation, farmSize, cropTypes, verificationStatus } = req.body;

    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE farmers SET farm_name = ?, farm_location = ?, farm_size = ?, crop_types = ?, verification_status = ?, updated_at = NOW() WHERE id = ?',
      [farmName, farmLocation, farmSize, cropTypes, verificationStatus, id]
    );

    connection.release();
    res.json({ message: 'Farmer updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating farmer', error: error.message });
  }
};

// Delete farmer
export const deleteFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM farmers WHERE id = ?', [id]);
    connection.release();
    res.json({ message: 'Farmer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting farmer', error: error.message });
  }
};

// Verify farmer
export const verifyFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const { verificationStatus } = req.body;

    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE farmers SET verification_status = ?, updated_at = NOW() WHERE id = ?',
      [verificationStatus, id]
    );
    connection.release();
    res.json({ message: 'Farmer verification updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying farmer', error: error.message });
  }
};

// Get farmer dashboard stats
export const getFarmerStats = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const connection = await pool.getConnection();

    const [farmer] = await connection.query('SELECT id FROM farmers WHERE farmer_id = ?', [farmerId]);
    
    if (farmer.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const fid = farmer[0].id;

    const [stats] = await connection.query(`
      SELECT 
        COUNT(DISTINCT id) as total_batches,
        SUM(CASE WHEN status = 'Processing' THEN 1 ELSE 0 END) as active_batches,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as sold_batches
      FROM produce_batches
      WHERE farmer_id = ?
    `, [fid]);

    connection.release();
    res.json(stats[0] || { total_batches: 0, active_batches: 0, sold_batches: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};
