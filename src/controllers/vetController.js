import Vet from '../models/vetModel.js';
import Token from '../models/vetTokenModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
            const token = jwt.sign({ id: vet._id}, process.env.JWT_SECRET);
            return res.status(200).json({ message: 'Login realizado com sucesso!', token });
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
        const vet = await Veterinario.findById(req.params.id);
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

    try {
        const Consulta = mongoose.model('Consulta', {
            animalId: mongoose.Schema.Types.ObjectId,
            data: Date,
            motivo: String,
            diagnostico: String
        });

        const consulta = new Consulta({ animalId, data, motivo, diagnostico });
        await consulta.save();
        
        res.status(201).json(consulta);
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

export { registerVet, loginVet, getVet, updateVet, createConsulta, createHistorico };