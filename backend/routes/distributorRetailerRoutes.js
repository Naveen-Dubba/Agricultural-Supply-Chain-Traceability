import express from 'express';
import {
  getAllDistributors,
  getDistributorById,
  addDistributor,
  updateDistributor,
  deleteDistributor,
  getAllRetailers,
  getRetailerById,
  addRetailer,
  updateRetailer,
  deleteRetailer,
  getRetailerInventory,
  addRetailerInventory,
} from '../controllers/distributorRetailerController.js';
import { authMiddleware, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Distributor routes
router.get('/distributors', authMiddleware, getAllDistributors);
router.get('/distributors/:id', authMiddleware, getDistributorById);
router.post('/distributors', authMiddleware, authorizeRole(['Admin']), addDistributor);
router.put('/distributors/:id', authMiddleware, authorizeRole(['Admin']), updateDistributor);
router.delete('/distributors/:id', authMiddleware, authorizeRole(['Admin']), deleteDistributor);

// Retailer routes
router.get('/retailers', authMiddleware, getAllRetailers);
router.get('/retailers/:id', authMiddleware, getRetailerById);
router.post('/retailers', authMiddleware, authorizeRole(['Admin']), addRetailer);
router.put('/retailers/:id', authMiddleware, authorizeRole(['Admin']), updateRetailer);
router.delete('/retailers/:id', authMiddleware, authorizeRole(['Admin']), deleteRetailer);

// Retailer inventory routes
router.get('/retailers/:retailerId/inventory', authMiddleware, getRetailerInventory);
router.post('/retailers/inventory', authMiddleware, addRetailerInventory);

export default router;
