import { Router } from 'express';
import { register, login, googleLogin, forgotPassword, resetPassword, seedData } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/seed-db', seedData);

export default router;
