import express from 'express';
import {
  getAllProduceBatches,
  getProduceBatchById,
  addProduceBatch,
  updateProduceBatch,
  deleteProduceBatch,
  getTraceability,
} from '../controllers/produceController.js';
import { authMiddleware, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllProduceBatches);
router.get('/:id', authMiddleware, getProduceBatchById);
router.post('/', authMiddleware, authorizeRole(['Farmer', 'Admin']), addProduceBatch);
router.put('/:id', authMiddleware, authorizeRole(['Farmer', 'Admin']), updateProduceBatch);
router.delete('/:id', authMiddleware, authorizeRole(['Admin']), deleteProduceBatch);

// Public traceability route
router.get('/trace/:batchId', getTraceability);

export default router;
