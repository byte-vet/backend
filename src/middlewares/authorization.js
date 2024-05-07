import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado.' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        console.log('Valor da variável JWT_SECRET:', secret);
        jwt.verify(token, secret); // Verifica se o token é válido
        next(); // Se o token for válido, chama a próxima rota

    } catch (error) {
        return res.status(403).json({ message: 'Token inválido.' });
    }
}
