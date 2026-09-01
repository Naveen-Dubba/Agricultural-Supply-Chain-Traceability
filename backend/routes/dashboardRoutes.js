import express from 'express';
import {
  getDashboardStats,
  getRecentActivities,
  getProduceByCategory,
  getQualityGrades,
  getShipmentStats,
} from '../controllers/dashboardController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', authMiddleware, getDashboardStats);
router.get('/activities', authMiddleware, getRecentActivities);
router.get('/categories', authMiddleware, getProduceByCategory);
router.get('/quality', authMiddleware, getQualityGrades);
router.get('/shipments', authMiddleware, getShipmentStats);

export default router;
