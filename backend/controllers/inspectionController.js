import pool from '../config/database.js';
import { generateInspectionId } from '../utils/idGenerators.js';

// Get all quality inspections
export const getAllInspections = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [inspections] = await connection.query(`
      SELECT qi.*, pb.batch_id, pb.product_name, u.full_name as inspector_name
      FROM quality_inspections qi
      JOIN produce_batches pb ON qi.batch_id = pb.id
      JOIN users u ON qi.inspector_id = u.id
      ORDER BY qi.created_at DESC
    `);
    connection.release();
    res.json(inspections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching inspections', error: error.message });
  }
};

// Get inspection by ID
export const getInspectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [inspections] = await connection.query(`
      SELECT qi.*, pb.batch_id, pb.product_name, u.full_name as inspector_name
      FROM quality_inspections qi
      JOIN produce_batches pb ON qi.batch_id = pb.id
      JOIN users u ON qi.inspector_id = u.id
      WHERE qi.id = ?
    `, [id]);

    if (inspections.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Inspection not found' });
    }

    connection.release();
    res.json(inspections[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching inspection', error: error.message });
  }
};

// Add quality inspection
export const addInspection = async (req, res) => {
  try {
    const {
      batchId,
      inspectorId,
      inspectionDate,
      productCondition,
      color,
      size,
      freshness,
      moistureLevel,
      temperature,
      damagePercentage,
      contaminationStatus,
      qualityGrade,
      inspectionResult,
      remarks,
    } = req.body;

    if (!batchId || !inspectorId || !inspectionDate || !qualityGrade || !inspectionResult) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    const inspectionId = generateInspectionId();

    await connection.query(
      `INSERT INTO quality_inspections
       (inspection_id, batch_id, inspector_id, inspection_date, product_condition, color, size,
        freshness, moisture_level, temperature, damage_percentage, contamination_status,
        quality_grade, inspection_result, remarks)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        inspectionId,
        batchId,
        inspectorId,
        inspectionDate,
        productCondition,
        color,
        size,
        freshness,
        moistureLevel,
        temperature,
        damagePercentage,
        contaminationStatus,
        qualityGrade,
        inspectionResult,
        remarks,
      ]
    );

    // Update produce batch quality grade
    await connection.query('UPDATE produce_batches SET initial_quality_grade = ? WHERE id = ?', [qualityGrade, batchId]);

    connection.release();
    res.status(201).json({ message: 'Inspection added successfully', inspectionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding inspection', error: error.message });
  }
};

// Update inspection
export const updateInspection = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productCondition,
      color,
      size,
      freshness,
      moistureLevel,
      temperature,
      damagePercentage,
      contaminationStatus,
      qualityGrade,
      inspectionResult,
      remarks,
    } = req.body;

    const connection = await pool.getConnection();
    await connection.query(
      `UPDATE quality_inspections
       SET product_condition = ?, color = ?, size = ?, freshness = ?, moisture_level = ?,
           temperature = ?, damage_percentage = ?, contamination_status = ?, quality_grade = ?,
           inspection_result = ?, remarks = ?
       WHERE id = ?`,
      [
        productCondition,
        color,
        size,
        freshness,
        moistureLevel,
        temperature,
        damagePercentage,
        contaminationStatus,
        qualityGrade,
        inspectionResult,
        remarks,
        id,
      ]
    );

    connection.release();
    res.json({ message: 'Inspection updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating inspection', error: error.message });
  }
};

// Delete inspection
export const deleteInspection = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM quality_inspections WHERE id = ?', [id]);
    connection.release();
    res.json({ message: 'Inspection deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting inspection', error: error.message });
  }
};
