import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getNotifications,
  markNotificationAsRead,
} from '../controllers/userController.js';
import { authMiddleware, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, authorizeRole(['Admin']), getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, authorizeRole(['Admin']), deleteUser);
router.get('/:userId/notifications', authMiddleware, getNotifications);
router.patch('/:notificationId/read', authMiddleware, markNotificationAsRead);

export default router;
