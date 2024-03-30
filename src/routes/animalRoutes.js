import express from 'express'; 
import animalSchema from '../models/animalModel.js';

const router = express.Router();

router.post('/animal', async (req, res) => {
    try {
        const animal = new animalSchema(req.body); 
        await animal.save();
        res.status(201).send(animal);
    } catch (error) {
        res.errored(500).send(error);
    }
});

export default router;

