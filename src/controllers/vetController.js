import Vet from '../models/vetModel.js';
import Consulta from '../models/consultaModel.js';
import Token from '../models/tokenModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Animal from '../models/animalModel.js';

/* mover funcoes de autenticacao para authController.js */
const registerVet = async (req, res) => {
    const { fullName, email, password, confirmPassword, nomeClinica } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'As senhas não conferem!' });
        } else if (await Vet.findOne({ email })) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        const vet = await Vet.create({ fullName, email, password: hashedPassword, nomeClinica });
        const newToken = await Token.create({ vetId: vet._id, token: jwt.sign({ id: vet._id }, process.env.JWT_SECRET) });
        console.log(newToken)
        console.log(process.env.JWT_SECRET)

        const data = {
            vetId: vet._id,
            fullName: vet.fullName,
            email: vet.email,
            nomeClinica: vet.nomeClinica,
            token: newToken.token
        }

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginVet = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vet = await Vet.findOne({ email });
        if (vet && bcrypt.compareSync(password, vet.password)) { // compara a senha informada com a senha criptografada no banco
            const token = jwt.sign({ id: vet._id }, process.env.JWT_SECRET);
            return res.status(200).json({ message: 'Login realizado com sucesso!', token, id: vet._id });
        } else {
            return res.status(400).json({ message: 'Email ou senha inválido.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/* rota privada */
const getVet = async (req, res) => {
    try {
        const vet = await Vet.findById(req.params.id);

        if (!vet) {
            res.status(404).json({ message: `Veterinário não encontrado com o id ${req.params.id}` });
        } else {
            res.status(200).send(vet);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateVet = async (req, res) => {
    const id = req.params.id;
    try {
        const vet = await Vet.findById(id);
        if (!vet) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        if (req.body.email) {
            const email = await Vet.findOne({ email: req.body.email });
            if (email) {
                return res.status(400).json({ message: 'Email já cadastrado.' });
            }
        }
        if (req.body.password && req.body.confirmPassword) {
            if (req.body.password !== req.body.confirmPassword) {
                return res.status(400).json({ message: 'As senhas não conferem.' });
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
        } else if (req.body.password && !req.body.confirmPassword) {
            delete req.body.password;
            return res.status(400).json({ message: 'Confirme a senha.' });
        }

        await Vet.findByIdAndUpdate(id, req.body, { new: true });

        const data = {
            fullName: req.body.fullName || vet.fullName,
            email: req.body.email || vet.email
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createConsulta = async (req, res) => {
    const { animalId, data, motivo, diagnostico } = req.body;
    const vetId = req.params.id;

    try {

        const consulta = new Consulta({ animalId, vetId, data, motivo, diagnostico });
        await consulta.save();

        res.status(201).json(consulta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getConsultaById = async (req, res) => {
    try {
        const id_vet = req.params.id;  // Pega o ID da consulta da URL
        const id_consulta = req.params.idConsulta;
        const consulta = await Consulta.findOne({ _id: id_consulta, vetId: id_vet });  // Busca a consulta pelo ID

        //const consulta = await Consulta.findById(id);  // Busca a consulta pelo ID
        console.log(id_consulta);
        if (!consulta) {
            return res.status(404).json({ message: 'Consulta not found' });
        }

        res.json(consulta);  // Retorna a consulta encontrada
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getConsultas = async (req, res) => {
    const vetId = req.params.id

    try {
        const consultas = await Consulta.find({ vetId: vetId })

        res.status(200).json(consultas)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}

const createHistorico = async (req, res) => {
    const { animalId, data, descricao } = req.body;

    try {
        const Historico = mongoose.model('Historico', {
            animalId: mongoose.Schema.Types.ObjectId,
            data: Date,
            descricao: String
        });

        const historico = new Historico({ animalId, data, descricao });
        await historico.save();

        res.status(201).json(historico);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllVets = async (req, res) => {
    try {
        const vets = await Vet.find();
        res.status(200).json(vets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllAnimals = async (req, res) => {
    try {
        const animais = await Animal.find();
        res.status(200).json(animais);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAnimal = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: `Animal not found with id ${req.params.id}` });
        }
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllConsultasByAnimal = async (req, res) => {
    const id = req.params.id;
    const id_pet = req.params.id_pet;
    try {
        const consultas = await Consulta.find({ animalId: id_pet });

        if (!consultas) {
            return res.status(404).json({ message: `Consultas not found with animal id ${req.params.id}` });
        }
        res.status(200).json(consultas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const googleRegisterVet = async (req, res) => {
    const { fullName, email, password, nomeClinica } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        if (password !== password) {
            return res.status(400).json({ message: 'As senhas não conferem!' });
        } else if (await Vet.findOne({ email })) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        const vet = await Vet.create({ fullName, email, password: hashedPassword, nomeClinica });
        const newToken = jwt.sign({ id: vet._id }, process.env.JWT_SECRET);
        console.log(newToken)
        console.log(process.env.JWT_SECRET)

        const data = {
            id: vet._id,
            fullName: vet.fullName,
            email: vet.email,
            nomeClinica: vet.nomeClinica,
            token: newToken
        }

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const googleLoginVet = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vet = await Vet.findOne({ email });
        if (vet && bcrypt.compareSync(password, vet.password)) { // compara a senha informada com a senha criptografada no banco
            const token = jwt.sign({ id: vet._id }, process.env.JWT_SECRET);
            console.log(token)
            return res.status(200).json({ message: 'Login realizado com sucesso!', token, id: vet._id });
        } else {
            return res.status(401).json({ message: 'Email ou senha inválido.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    registerVet,
    loginVet,
    getVet,
    updateVet,
    createConsulta,
    getConsultaById,
    getConsultas,
    createHistorico,
    getAllVets,
    getAllAnimals,
    getAnimal,
    getAllConsultasByAnimal,
    googleRegisterVet,
    googleLoginVet
};