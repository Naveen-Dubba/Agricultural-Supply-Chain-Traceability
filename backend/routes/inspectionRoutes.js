import express from 'express';
import {
  getAllInspections,
  getInspectionById,
  addInspection,
  updateInspection,
  deleteInspection,
} from '../controllers/inspectionController.js';
import { authMiddleware, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllInspections);
router.get('/:id', authMiddleware, getInspectionById);
router.post('/', authMiddleware, authorizeRole(['QualityInspector', 'Admin']), addInspection);
router.put('/:id', authMiddleware, authorizeRole(['QualityInspector', 'Admin']), updateInspection);
router.delete('/:id', authMiddleware, authorizeRole(['Admin']), deleteInspection);

export default router;
