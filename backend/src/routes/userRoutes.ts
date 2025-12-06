import express from 'express';
import { getProfile, updateProfile, getAllUsers, createUser, updateUserById } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.get('/', authenticateToken, getAllUsers);
router.post('/', authenticateToken, createUser);
router.put('/:id', authenticateToken, updateUserById);

export default router;
