import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import Consulta from '../models/consultaModel.js';


const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id, '-password');
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        if (req.body.email) {
            const email = await User.findOne({ email: req.body.email });
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

        await User.findByIdAndUpdate(id, req.body, { new: true });

        const data = { 
            fullName: req.body.fullName || user.fullName,
            email: req.body.email || user.email
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createConsulta = async (req, res) => {
    const { animalId, data, motivo, diagnostico } = req.body;
    const userId = req.params.id;

    try {
        const consulta = new Consulta({ animalId, userId, data, motivo, diagnostico });
        await consulta.save();

        res.status(201).json(consulta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getConsultaById = async (req, res) => {
    try {
        const id_user = req.params.id;
        const id_consulta = req.params.idConsulta;
        const consulta = await Consulta.findOne({ _id: id_consulta, userId: id_user });

        if (!consulta) {
            return res.status(404).json({ message: 'Consulta not found' });
        }

        res.json(consulta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getConsultasByAnimal = async (req, res) => {
    const userId = req.params.id;
    const animalId = req.params.animalId;
    try {
        const consultas = await Consulta.find({ userId, animalId });

        if (!consultas) {
            return res.status(404).json({ message: `Consultas not found for user with id ${userId} and animal id ${animalId}` });
        }

        res.status(200).json(consultas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export { getUser, updateUser, createConsulta, getConsultaById, getConsultasByAnimal }; 

