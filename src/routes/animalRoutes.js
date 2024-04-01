import express from 'express'; 
import { createAnimal, getAnimal, getAllAnimals } from '../controllers/animalController.js';

const router = express.Router();

router.post('/', createAnimal); // url - http://localhost:3000/animais
router.get('/:id', getAnimal);  // url - http://localhost:3000/animais/{id}
router.get('/', getAllAnimals); // url - http://localhost:3000/animais

export default router;

