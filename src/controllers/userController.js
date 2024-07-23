import User from '../models/userModel.js';
import Token from '../models/tokenModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '../utils/sendEmail.js';
import Consulta from '../models/consultaModel.js';

/* mover funcoes de autenticacao para authController.js */
const registerUser = async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'As senhas não conferem!' });
        } else if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        const user = await User.create({ fullName, email, password: hashedPassword });
        const newToken = await Token.create({ userId: user._id, token: jwt.sign({ id: user._id }, process.env.JWT_SECRET) });
        
        const data = {
                userId: user._id,
                fullName: user.fullName,
                email: user.email,
                token: newToken.token
        }

        res.status(201).json(data); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) { // compara a senha informada com a senha criptografada no banco
            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
            return res.status(200).json({ message: 'Login realizado com sucesso!', token, id: user._id });
        } else {
            return res.status(400).json({ message: 'Email ou senha inválido.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const requestResetPassword = async (req, res) => {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Email não cadastrado!' });
    }

    let token = await Token.findOne({ userId: user._id });

    if (token) {
        await token.deleteOne(); // Deleta o token antigo
    }
    let resetToken = crypto.randomBytes(32).toString('hex'); // Gera um token de 32 bytes
    const hash = await bcrypt.hash(resetToken, 10); // Criptografa o token

    const newToken = await Token.create({ userId: user._id, token: hash, createdAt: Date.now() }); // Salva o token no banco
    
    const link = `https://bytevet.vercel.app/reset-password?token=${resetToken}&id=${user._id}`; // futuramente alterar para o domínio do site
    sendEmail(user.email, 'Recuperação de senha', {name: user.fullName, link: link}, '../utils/template/requestResetPassword.handlebars'); // Envia o email

    console.log(link)
    res.status(200).json({ message: 'Email enviado!', newToken });
}

const resetPassword = async (req, res) => {
    const { id, token, password, confirmPassword } = req.body;
    let passwordResetToken = await Token.findOne({ userId: id });
    if (!passwordResetToken) {
        return res.status(400).json({ message: 'Token inválido ou expirado!' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'As senhas não conferem!' });
    }

    const isValid = bcrypt.compareSync(token, passwordResetToken.token);
    if (!isValid) {
        return res.status(400).json({ message: 'Token inválido ou expirado!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
        { _id: id },
        { $set: { password: hashedPassword } },
        { new: true } // Retorna o documento modificado
    );

    const user = await User.findById( { _id: id });
    sendEmail(
        user.email, 
        'Senha alterada', 
        {
            name: user.fullName
        }, 
        '../utils/template/resetPassword.handlebars'
    );

    await passwordResetToken.deleteOne(); // Deleta o token após a senha ser alterada
    res.status(200).json({ message: 'Senha alterada com sucesso!' });
}

/* rota privada */ 
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


export { registerUser, loginUser, getUser, updateUser, requestResetPassword, resetPassword, createConsulta, getConsultaById, getConsultasByAnimal }; 

