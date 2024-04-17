import express from 'express';
import { getUser } from '../controllers/userController.js';
import { checkToken } from '../middlewares/authorization.js';
import { createAnimal, getAllAnimalsByUser } from '../controllers/animalController.js';

const router = express.Router();

router.post('/pets/', checkToken, createAnimal); //http://localhost:3000/users/{{id_usuario}}/pets/
router.get('/:id', checkToken, getUser); // http://localhost:3000/users/{{id_usuario}}
router.get('/:id/pets', checkToken, getAllAnimalsByUser); // http://localhost:3000/users/{{id_usuario}}/pets

export default router;