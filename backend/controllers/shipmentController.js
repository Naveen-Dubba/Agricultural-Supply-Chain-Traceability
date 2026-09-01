import pool from '../config/database.js';

// Get all shipments
export const getAllShipments = async (req, res) => {
  try {
    const { status } = req.query;
    let query = `
      SELECT s.*, pb.batch_id, pb.product_name, lp.provider_name
      FROM shipments s
      JOIN produce_batches pb ON s.batch_id = pb.id
      LEFT JOIN logistics_providers lp ON s.logistics_provider_id = lp.id
    `;

    const params = [];

    if (status) {
      query += ' WHERE s.shipment_status = ?';
      params.push(status);
    }

    query += ' ORDER BY s.created_at DESC';

    const connection = await pool.getConnection();
    const [shipments] = await connection.query(query, params);
    connection.release();
    res.json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching shipments', error: error.message });
  }
};

// Get shipment by ID
export const getShipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [shipments] = await connection.query(`
      SELECT s.*, pb.batch_id, pb.product_name, lp.provider_name
      FROM shipments s
      JOIN produce_batches pb ON s.batch_id = pb.id
      LEFT JOIN logistics_providers lp ON s.logistics_provider_id = lp.id
      WHERE s.id = ?
    `, [id]);

    if (shipments.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Shipment not found' });
    }

    connection.release();
    res.json(shipments[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching shipment', error: error.message });
  }
};

// Add shipment
export const addShipment = async (req, res) => {
  try {
    const {
      batchId,
      logisticsProviderId,
      vehicleNumber,
      driverName,
      driverPhone,
      origin,
      destination,
      dispatchDate,
      expectedDeliveryDate,
      transportTemperature,
      transportCondition,
      notes,
    } = req.body;

    if (!batchId || !origin || !destination || !dispatchDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    const shipmentId = `SHIP-${Math.floor(Math.random() * 999999) + 1}`;

    await connection.query(
      `INSERT INTO shipments
       (shipment_id, batch_id, logistics_provider_id, vehicle_number, driver_name, driver_phone,
        origin, destination, dispatch_date, expected_delivery_date, transport_temperature,
        transport_condition, shipment_status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        shipmentId,
        batchId,
        logisticsProviderId || null,
        vehicleNumber || null,
        driverName || null,
        driverPhone || null,
        origin,
        destination,
        dispatchDate,
        expectedDeliveryDate || null,
        transportTemperature || null,
        transportCondition || null,
        'Scheduled',
        notes || null,
      ]
    );

    connection.release();
    res.status(201).json({ message: 'Shipment added successfully', shipmentId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding shipment', error: error.message });
  }
};

// Update shipment status
export const updateShipmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { shipmentStatus, actualDeliveryDate, transportCondition } = req.body;

    const connection = await pool.getConnection();
    await connection.query(
      `UPDATE shipments
       SET shipment_status = ?, actual_delivery_date = ?, transport_condition = ?, updated_at = NOW()
       WHERE id = ?`,
      [shipmentStatus, actualDeliveryDate || null, transportCondition || null, id]
    );

    connection.release();
    res.json({ message: 'Shipment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating shipment', error: error.message });
  }
};

// Delete shipment
export const deleteShipment = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM shipments WHERE id = ?', [id]);
    connection.release();
    res.json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting shipment', error: error.message });
  }
};
