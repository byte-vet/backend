import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/userController.js';
import { checkToken } from '../middlewares/authorization.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/users/:id', checkToken, getUser);

export default router;