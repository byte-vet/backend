import express from 'express';
import { getUser } from '../controllers/userController.js';
import { checkToken } from '../middlewares/authorization.js';
import { createAnimal, getAllAnimalsByUser, deleteAnimalByUser, getAnimalByUser } from '../controllers/animalController.js';

const router = express.Router();

router.post('/:id/pets/', checkToken, createAnimal); //http://localhost:3000/users/{{id_usuario}}/pets/
router.get('/:id', checkToken, getUser); // http://localhost:3000/users/{{id_usuario}}
router.get('/:id/pets', checkToken, getAllAnimalsByUser); // http://localhost:3000/users/{{id_usuario}}/pets
router.get('/:id/pets/:id_pet', checkToken, getAnimalByUser); // http://localhost:3000/users/{{id_usuario}}/pets/{{id_pet}}
router.delete('/:id/pets/:id_pet', checkToken, deleteAnimalByUser); // http://localhost:3000/users/{{id_usuario}}/pets/{{id_pet}}

export default router;