import express from 'express';
import {
  getAllShipments,
  getShipmentById,
  addShipment,
  updateShipmentStatus,
  deleteShipment,
} from '../controllers/shipmentController.js';
import { authMiddleware, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllShipments);
router.get('/:id', authMiddleware, getShipmentById);
router.post('/', authMiddleware, authorizeRole(['LogisticsProvider', 'Admin']), addShipment);
router.patch('/:id/status', authMiddleware, authorizeRole(['LogisticsProvider', 'Admin']), updateShipmentStatus);
router.delete('/:id', authMiddleware, authorizeRole(['Admin']), deleteShipment);

export default router;
