import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/userController.js';
import { registerVet, loginVet, getVet } from '../controllers/vetController.js'; // Importe as funções do controlador do veterinário
import { checkToken } from '../middlewares/authorization.js';

const router = express.Router();

router.post('/signup', registerUser); // http://localhost:3000/auth/signup
router.post('/login', loginUser); // http://localhost:3000/auth/login
router.post('/vet/signup', registerVet); // Rota de registro de veterinário
router.post('/vet/login', loginVet); // Rota de login de veterinário

export default router;
