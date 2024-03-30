import express from 'express'; 
import createAnimal from '../controllers/animalController.js';

const router = express.Router();

router.post('/', createAnimal); // url - http://localhost:3000/animal 

export default router;

