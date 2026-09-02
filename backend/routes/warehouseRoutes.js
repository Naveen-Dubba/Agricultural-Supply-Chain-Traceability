import express from 'express';
import {
  getAllWarehouses,
  getWarehouseById,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouseInventory,
  addInventory,
  updateInventoryQuantity,
  transferInventory,
} from '../controllers/warehouseController.js';
import { authMiddleware, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllWarehouses);
router.get('/:id', authMiddleware, getWarehouseById);
router.get('/:warehouseId/inventory', authMiddleware, getWarehouseInventory);
router.post('/', authMiddleware, authorizeRole(['Admin']), addWarehouse);
router.put('/:id', authMiddleware, authorizeRole(['WarehouseManager', 'Admin']), updateWarehouse);
router.delete('/:id', authMiddleware, authorizeRole(['Admin']), deleteWarehouse);

// Inventory operations
router.post('/inventory', authMiddleware, authorizeRole(['WarehouseManager', 'Admin']), addInventory);
router.put('/inventory/:id/quantity', authMiddleware, authorizeRole(['WarehouseManager', 'Admin']), updateInventoryQuantity);
router.post('/inventory/transfer', authMiddleware, authorizeRole(['WarehouseManager', 'Admin']), transferInventory);

export default router;
