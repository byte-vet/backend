import Animal from '../models/animalModel.js';
import Usuario from '../models/userModel.js';

const createAnimal = async (req, res) => {
    const { usuario, nome, especie, raca, idade, peso } = req.body;
    try {
        if (!await Usuario.findById(usuario)) {
            res.status(404).json({ message: `Usuário com id ${usuario} não encontrado` });
            return;
        }
        const newAnimal = await Animal.create({ usuario, nome, especie, raca, idade, peso });
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAnimal = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            res.status(404).json({ message: `Animal não encontrado com o id ${req.params.id}` });
        } else {
            res.status(200).send(animal);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getAllAnimals = async (req, res) => {
    const animais = await Animal.find();
    res.status(200).send(animais);
}

const deleteAnimal = async (req, res) => {
    try {
        // adicionar tratamento de erros
        await Animal.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: `Animal com id ${req.params.id} removido com sucesso!` })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { createAnimal, getAnimal, getAllAnimals, deleteAnimal };