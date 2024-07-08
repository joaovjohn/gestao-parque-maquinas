const jsonwebtoken = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { db } = require('../config/connection');
require('dotenv').config();

async function login(req, res) {
    const { login, senha } = req.body;
    if (!login || !senha) {
        return res.status(400).json({ error: 'Login e senha são obrigatórios' });
    }
    const user = await db.oneOrNone(`SELECT id,login,senha FROM pessoa WHERE login = $1`, login);
    if (user && await bcrypt.compare(senha, user.senha)) {
        const payload = { id: user.id, login: user.login };
        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });
        res.json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ message: 'Usuario ou Senha inválidos' });
    }
}

module.exports = {
    login
};