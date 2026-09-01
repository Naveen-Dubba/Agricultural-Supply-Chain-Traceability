import pool from '../config/database.js';
import { generateBatchId, generateQRCode } from '../utils/idGenerators.js';
import { generateQRCode as generateQRCodeUtil } from '../utils/qrCodeUtils.js';

// Get all produce batches
export const getAllProduceBatches = async (req, res) => {
  try {
    const { status, farmer, product } = req.query;
    let query = `
      SELECT pb.*, f.farmer_id, f.farm_name, u.full_name
      FROM produce_batches pb
      JOIN farmers f ON pb.farmer_id = f.id
      JOIN users u ON f.user_id = u.id
      WHERE 1=1
    `;

    const params = [];

    if (status) {
      query += ' AND pb.status = ?';
      params.push(status);
    }

    if (farmer) {
      query += ' AND f.farmer_id LIKE ?';
      params.push(`%${farmer}%`);
    }

    if (product) {
      query += ' AND pb.product_name LIKE ?';
      params.push(`%${product}%`);
    }

    query += ' ORDER BY pb.created_at DESC';

    const connection = await pool.getConnection();
    const [batches] = await connection.query(query, params);
    connection.release();
    res.json(batches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching produce batches', error: error.message });
  }
};

// Get produce batch by ID
export const getProduceBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [batches] = await connection.query(`
      SELECT pb.*, f.farmer_id, f.farm_name, u.full_name
      FROM produce_batches pb
      JOIN farmers f ON pb.farmer_id = f.id
      JOIN users u ON f.user_id = u.id
      WHERE pb.id = ?
    `, [id]);

    if (batches.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Batch not found' });
    }

    connection.release();
    res.json(batches[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching batch', error: error.message });
  }
};

// Add produce batch
export const addProduceBatch = async (req, res) => {
  try {
    const {
      productName,
      productCategory,
      cropVariety,
      farmerId,
      farmLocation,
      harvestDate,
      quantity,
      unit,
      cultivationType,
      organicStatus,
      storageRequirement,
      expectedShelfLife,
      notes,
    } = req.body;

    if (!productName || !farmerId || !harvestDate || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();

    const batchId = generateBatchId();
    const qrCode = await generateQRCodeUtil(batchId);

    await connection.query(
      `INSERT INTO produce_batches 
       (batch_id, product_name, product_category, crop_variety, farmer_id, farm_location, 
        harvest_date, quantity, unit, cultivation_type, organic_status, storage_requirement, 
        expected_shelf_life, current_stage, status, notes, qr_code) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        batchId,
        productName,
        productCategory,
        cropVariety || null,
        farmerId,
        farmLocation || null,
        harvestDate,
        quantity,
        unit || 'kg',
        cultivationType || 'Conventional',
        organicStatus || 'Conventional',
        storageRequirement || null,
        expectedShelfLife || null,
        'Farm',
        'Pending',
        notes || null,
        qrCode,
      ]
    );

    connection.release();
    res.status(201).json({ message: 'Produce batch added successfully', batchId, qrCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding produce batch', error: error.message });
  }
};

// Update produce batch
export const updateProduceBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productName,
      productCategory,
      cropVariety,
      quantity,
      unit,
      cultivationType,
      organicStatus,
      storageRequirement,
      expectedShelfLife,
      currentStage,
      status,
      notes,
    } = req.body;

    const connection = await pool.getConnection();
    await connection.query(
      `UPDATE produce_batches 
       SET product_name = ?, product_category = ?, crop_variety = ?, quantity = ?, unit = ?,
           cultivation_type = ?, organic_status = ?, storage_requirement = ?, expected_shelf_life = ?,
           current_stage = ?, status = ?, notes = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        productName,
        productCategory,
        cropVariety,
        quantity,
        unit,
        cultivationType,
        organicStatus,
        storageRequirement,
        expectedShelfLife,
        currentStage,
        status,
        notes,
        id,
      ]
    );

    connection.release();
    res.json({ message: 'Produce batch updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating batch', error: error.message });
  }
};

// Delete produce batch
export const deleteProduceBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM produce_batches WHERE id = ?', [id]);
    connection.release();
    res.json({ message: 'Produce batch deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting batch', error: error.message });
  }
};

// Get batch by batch_id (public traceability)
export const getTraceability = async (req, res) => {
  try {
    const { batchId } = req.params;
    const connection = await pool.getConnection();

    const [batches] = await connection.query(
      `SELECT pb.*, f.farmer_id, f.farm_name, f.farm_location, u.full_name as farmer_name
       FROM produce_batches pb
       JOIN farmers f ON pb.farmer_id = f.id
       JOIN users u ON f.user_id = u.id
       WHERE pb.batch_id = ?`,
      [batchId]
    );

    if (batches.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Get traceability events
    const [events] = await connection.query(
      `SELECT * FROM traceability_events WHERE batch_id = ? ORDER BY event_date ASC, event_time ASC`,
      [batches[0].id]
    );

    connection.release();

    res.json({
      batch: batches[0],
      events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching traceability', error: error.message });
  }
};
