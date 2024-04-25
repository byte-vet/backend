import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/userController.js';
import { checkToken } from '../middlewares/authorization.js';

const router = express.Router();

router.post('/signup', registerUser); // http://localhost:3000/auth/signup
router.post('/login', loginUser); // http://localhost:3000/auth/login

export default router;