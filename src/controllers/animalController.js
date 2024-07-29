import Animal from '../models/animalModel.js';
import Usuario from '../models/userModel.js';
import path from 'path';
import fs from 'fs';

// Criação de um novo animal
const createAnimal = async (req, res) => {
    const { usuario, nome, especie, raca, idade, peso } = req.body;
    try {
        const user = await Usuario.findById(usuario);
        if (!user) {
            return res.status(404).json({ message: `Usuário com id ${usuario} não encontrado` });
        }
        const newAnimal = await Animal.create({ usuario, nome, especie, raca, idade, peso });
        user.pets.push(newAnimal._id); // adiciona o id do animal no array de pets do usuário
        await user.save();
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obter um animal específico
const getAnimal = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: `Animal não encontrado com o id ${req.params.id}` });
        }
        res.status(200).send(animal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obter todos os animais
const getAllAnimals = async (_, res) => {
    try {
        const animais = await Animal.find();
        res.status(200).send(animais);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Deletar um animal
const deleteAnimal = async (req, res) => {
    try {
        await Animal.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: `Animal com id ${req.params.id} removido com sucesso!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obter todos os animais de um usuário
const getAllAnimalsByUser = async (req, res) => {
    try {
        const user = await Usuario.findById(req.params.id).populate('pets');
        if (!user) {
            return res.status(404).json({ message: `Usuário com id ${req.params.id} não encontrado` });
        }
        res.status(200).json(user.pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Deletar um animal de um usuário
const deleteAnimalByUser = async (req, res) => {
    const id_user = req.params.id;
    const id_pet = req.params.id_pet;
    try {
        const user = await Usuario.findById(id_user);
        if (!user) {
            return res.status(404).json({ message: `Usuário com id ${id_user} não encontrado` });
        }
        if (!await animalExists(id_user, id_pet)) {
            return res.status(404).json({ message: `Animal com id ${id_pet} não encontrado` });
        }
        await Animal.findByIdAndDelete(id_pet);
        user.pets = user.pets.filter(pet => pet.toString() !== id_pet);
        await user.save();
        res.status(200).json({ message: `Animal com id ${id_pet} removido com sucesso!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obter um animal de um usuário específico
const getAnimalByUser = async (req, res) => {
    const id_user = req.params.id;
    const id_pet = req.params.id_pet;
    try {
        const user = await Usuario.findById(id_user);
        if (!user) {
            return res.status(404).json({ message: `Usuário com id ${id_user} não encontrado` });
        }
        if (!await animalExists(id_user, id_pet)) {
            return res.status(404).json({ message: `Animal com id ${id_pet} não encontrado` });
        }
        const animal = await Animal.findById(id_pet);
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Atualizar um animal de um usuário específico
const updateAnimalByUser = async (req, res) => {
    const id_user = req.params.id;
    const id_pet = req.params.id_pet;
    try {
        const user = await Usuario.findById(id_user);
        if (!user) {
            return res.status(404).json({ message: `Usuário com id ${id_user} não encontrado` });
        }
        if (!await animalExists(id_user, id_pet)) {
            return res.status(404).json({ message: `Animal com id ${id_pet} não encontrado` });
        }
        const animal = await Animal.findByIdAndUpdate(id_pet, req.body, { new: true });
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Checa se o usuário possui o pet informado
const animalExists = async (id_user, id_pet) => {
    const user = await Usuario.findOne({ _id: id_user, pets: id_pet });
    return user !== null;
}

// Upload do cartão de vacinação em PDF
const uploadVaccinationCard = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Nenhum arquivo enviado.');
        }

        const animalId = req.params.id;
        const filePath = req.file.path;

        const animal = await Animal.findById(animalId);
        if (!animal) {
            return res.status(404).send('Animal não encontrado.');
        }

        animal.vacinacaoCartaoPDF = filePath;
        await animal.save();

        res.status(200).send('Arquivo enviado com sucesso.');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Download do cartão de vacinação em PDF
const downloadVaccinationCard = async (req, res) => {
    try {
        const animalId = req.params.id;

        const animal = await Animal.findById(animalId);
        if (!animal || !animal.vacinacaoCartaoPDF) {
            return res.status(404).send('Arquivo não encontrado.');
        }

        const filePath = animal.vacinacaoCartaoPDF;
        res.download(filePath);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export {
    createAnimal,
    getAnimal,
    getAllAnimals,
    deleteAnimal,
    getAllAnimalsByUser,
    deleteAnimalByUser,
    getAnimalByUser,
    updateAnimalByUser,
    uploadVaccinationCard,
    downloadVaccinationCard
};
