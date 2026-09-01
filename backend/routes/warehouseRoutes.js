import express from 'express';
import {
  getAllWarehouses,
  getWarehouseById,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouseInventory,
} from '../controllers/warehouseController.js';
import { authMiddleware, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllWarehouses);
router.get('/:id', authMiddleware, getWarehouseById);
router.get('/:warehouseId/inventory', authMiddleware, getWarehouseInventory);
router.post('/', authMiddleware, authorizeRole(['Admin']), addWarehouse);
router.put('/:id', authMiddleware, authorizeRole(['WarehouseManager', 'Admin']), updateWarehouse);
router.delete('/:id', authMiddleware, authorizeRole(['Admin']), deleteWarehouse);

export default router;
