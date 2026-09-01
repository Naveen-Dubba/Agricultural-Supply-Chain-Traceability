import express from 'express';
import {
  getAllFarmers,
  getFarmerById,
  addFarmer,
  updateFarmer,
  deleteFarmer,
  verifyFarmer,
  getFarmerStats,
} from '../controllers/farmerController.js';
import { authMiddleware, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllFarmers);
router.get('/:id', authMiddleware, getFarmerById);
router.get('/:farmerId/stats', getFarmerStats);
router.post('/', authMiddleware, authorizeRole(['Admin']), addFarmer);
router.put('/:id', authMiddleware, authorizeRole(['Admin']), updateFarmer);
router.delete('/:id', authMiddleware, authorizeRole(['Admin']), deleteFarmer);
router.patch('/:id/verify', authMiddleware, authorizeRole(['Admin']), verifyFarmer);

export default router;
