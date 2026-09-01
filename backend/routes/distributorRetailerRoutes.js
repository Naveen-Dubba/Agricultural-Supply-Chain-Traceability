import express from 'express';
import {
  getAllDistributors,
  getAllRetailers,
  getRetailerInventory,
  addRetailerInventory,
} from '../controllers/distributorRetailerController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/distributors', authMiddleware, getAllDistributors);
router.get('/retailers', authMiddleware, getAllRetailers);
router.get('/retailers/:retailerId/inventory', authMiddleware, getRetailerInventory);
router.post('/retailers/inventory', authMiddleware, addRetailerInventory);

export default router;
