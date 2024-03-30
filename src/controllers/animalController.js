import Animal from '../models/animalModel';

const createAnimal = async (req, res) => {
    const { nome, especie, raca, idade, peso } = req.body;
    try {
        const newAnimal = await Animal.create({ nome, especie, raca, idade, peso });
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createAnimal
}