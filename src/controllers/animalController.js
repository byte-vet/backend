import Animal from '../models/animalModel.js';
import Usuario from '../models/userModel.js';

const createAnimal = async (req, res) => {
    const { usuario, nome, especie, raca, idade, peso } = req.body;
    const user = await Usuario.findById(usuario);
    try {
        if (!user) {
            res.status(404).json({ message: `Usuário com id ${usuario} não encontrado` });
            return;
        }
        const newAnimal = await Animal.create({ usuario, nome, especie, raca, idade, peso });
        user.pets = [...user.pets, newAnimal._id]; // adiciona o id do animal no array de pets do usuário
        await user.save();

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

const getAllAnimals = async (_, res) => {
    const animais = await Animal.find();
    res.status(200).send(animais);
}

const deleteAnimal = async (req, res) => {
    try {
        // adicionar tratamento de erros
        await Animal.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: `Animal com id ${req.params.id} removido com sucesso!` });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllAnimalsByUser = async (req, res) => {
    try {
        const user = await Usuario.findById(req.params.id).populate('pets');
        if (!user) {
            res.status(404).json({ message: `Usuário com id ${req.params.id} não encontrado` });
            return;
        }
        res.status(200).json(user.pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAnimalByUser = async (req, res) => {
    const id_user = req.params.id;
    const id_pet = req.params.id_pet;
    try {
        const user = await Usuario.findById(id_user);
        if (!user) {
            res.status(404).json({ message: `Usuário com id ${id_user} não encontrado` });
            return;
        }
        if (!animalExists(id_user, id_pet)) {
            res.status(404).json({ message: `Animal com id ${id_pet} não encontrado` });
            return;
        }
        await Animal.findByIdAndDelete(id_pet);
        user.pets.splice(index, 1);
        await user.save();
        res.status(200).json({ message: `Animal com id ${id_pet} removido com sucesso!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/* Checa se o usuário possui o pet informado */
const animalExists = (id_user, id_pet) => { 
    if (Usuario.findOne({ _id: id_user, pets: id_pet }) !== null) {
        return true;
    }
    return false;
}

export { createAnimal, 
        getAnimal, 
        getAllAnimals, 
        deleteAnimal, 
        getAllAnimalsByUser, 
        deleteAnimalByUser 
    };