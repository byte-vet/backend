import Animal from '../models/animalModel.js';

const createAnimal = async (req, res) => {
    const { nome, especie, raca, idade, peso } = req.body;
    try {
        const newAnimal = await Animal.create({ nome, especie, raca, idade, peso });
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAnimal = async(req, res) => {
    
    try {
        const animal = await Animal.findById(req.params.id);
        if(!animal) {
            res.status(404).json({ message: `Animal não encontrado com o id ${req.params.id}`});
        } else {
            res.status(200).send(animal);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getAllAnimals = async(req, res) => {

    const animais = await Animal.find();
    res.status(200).send(animais);
}

export { createAnimal, getAnimal, getAllAnimals };