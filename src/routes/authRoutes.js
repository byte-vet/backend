import express from 'express';
import { registerUser, loginUser, requestResetPassword, resetPassword } from '../controllers/userController.js';
import { checkToken } from '../middlewares/authorization.js';

const router = express.Router();

router.post('/signup', registerUser); // http://localhost:3000/auth/signup
router.post('/login', loginUser); // http://localhost:3000/auth/login
router.post('/requestResetPassword', requestResetPassword); // http://localhost:3000/auth/requestResetPassword
router.post('/resetPassword', checkToken, resetPassword); // http://localhost:3000/auth/resetPassword

export default router;