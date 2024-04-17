import Vet from '../models/vetModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerVet = async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'As senhas não conferem!' });
        } else if (await Vet.findOne({ email  })) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        await Vet.create({ fullName, email, password: hashedPassword });
        
        res.status(201).json({message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginVet = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vet = await Vet.findOne({ email });
        if (vet && bcrypt.compare(password, vet.password)) {
            const token = jwt.sign({ email: vet.email}, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Login realizado com sucesso!', token });
        } else {
            return res.status(400).json({ message: 'Email ou senha inválido.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export { registerVet, loginVet };