import express from 'express';
import { registerUser, loginUser, requestResetPassword, resetPassword, emailVerification }  from '../controllers/authController.js';
import { registerVet, loginVet, getVet } from '../controllers/vetController.js'; // Importe as funções do controlador do veterinário

const router = express.Router();

router.post('/signup', registerUser); // http://localhost:3000/auth/signup
router.post('/login', loginUser); // http://localhost:3000/auth/login
router.post('/requestResetPassword', requestResetPassword); // http://localhost:3000/auth/requestResetPassword
router.post('/resetPassword', resetPassword); // http://localhost:3000/auth/resetPassword
router.post('verify-email', emailVerification); // http://localhost:3000/auth/verify-email
router.post('/vet/signup', registerVet); // Rota de registro de veterinário
router.post('/vet/login', loginVet); // Rota de login de veterinário

export default router;
