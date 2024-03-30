import animalModel from '../models/animalModel.js';

const createAnimal = async (req, res) => {
    const { nome, especie, raca, idade, peso } = req.body;
    try {
        const newAnimal = await animalModel.create({ nome, especie, raca, idade, peso });
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default createAnimal; 
