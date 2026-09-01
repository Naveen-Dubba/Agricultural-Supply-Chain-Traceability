import pool from '../config/database.js';

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [userStats] = await connection.query(`
      SELECT
        (SELECT COUNT(*) FROM farmers) as total_farmers,
        (SELECT COUNT(*) FROM produce_batches) as total_batches,
        (SELECT COUNT(*) FROM shipments WHERE shipment_status IN ('Scheduled', 'Dispatched', 'In Transit')) as active_shipments,
        (SELECT COUNT(*) FROM warehouses) as total_warehouses,
        (SELECT COUNT(*) FROM distributors) as total_distributors,
        (SELECT COUNT(*) FROM retailers) as total_retailers,
        (SELECT COUNT(*) FROM quality_inspections WHERE inspection_result = 'Rejected') as rejected_produce,
        (SELECT COUNT(*) FROM shipments WHERE shipment_status = 'Delivered') as completed_deliveries
    `);

    const [inventoryStats] = await connection.query(`
      SELECT COALESCE(SUM(current_quantity), 0) as total_inventory
      FROM inventory
    `);

    const [pendingInspections] = await connection.query(`
      SELECT COUNT(*) as pending_count
      FROM produce_batches
      WHERE status = 'Pending'
    `);

    connection.release();

    const stats = {
      ...userStats[0],
      ...inventoryStats[0],
      ...pendingInspections[0],
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

// Get recent activities
export const getRecentActivities = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [activities] = await connection.query(`
      SELECT 'Batch Registered' as activity_type, batch_id as related_id, created_at, 'Batch' as category
      FROM produce_batches
      UNION ALL
      SELECT 'Quality Inspection', batch_id, created_at, 'Inspection'
      FROM quality_inspections
      UNION ALL
      SELECT 'Shipment Dispatch', batch_id, dispatch_date, 'Shipment'
      FROM shipments
      ORDER BY created_at DESC
      LIMIT 10
    `);

    connection.release();
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching activities', error: error.message });
  }
};

// Get produce by category
export const getProduceByCategory = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [data] = await connection.query(`
      SELECT product_category as category, COUNT(*) as count
      FROM produce_batches
      GROUP BY product_category
    `);

    connection.release();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching category data', error: error.message });
  }
};

// Get quality grade distribution
export const getQualityGrades = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [data] = await connection.query(`
      SELECT quality_grade as grade, COUNT(*) as count
      FROM quality_inspections
      GROUP BY quality_grade
    `);

    connection.release();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quality data', error: error.message });
  }
};

// Get shipment status distribution
export const getShipmentStats = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [data] = await connection.query(`
      SELECT shipment_status as status, COUNT(*) as count
      FROM shipments
      GROUP BY shipment_status
    `);

    connection.release();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching shipment stats', error: error.message });
  }
};
