import express from 'express'; 
import { createAnimal, getAnimal } from '../controllers/animalController.js';

const router = express.Router();

router.post('/', createAnimal); // url - http://localhost:3000/animal 
router.get('/:id', getAnimal);  // url - http://localhost:3000/animal/{id}

export default router;

