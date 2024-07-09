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
        const isSupervisor = await db.oneOrNone(`SELECT 1 FROM supervisor WHERE pessoa_id = $1`, user.id);
        const isMotorista = await db.oneOrNone(`SELECT 1 FROM motorista WHERE pessoa_id = $1`, user.id);
        const role = isSupervisor ? 'supervisor' : isMotorista ? 'motorista' : 'pessoa';
        if (role === 'pessoa') {
            return res.status(401).json({ message: 'Usuário não autorizado' });
        }
        const payload = { id: user.id, login: user.login , user: role };
        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });
        res.json({ message: 'Login successful', token , user: role});
    } else {
        res.status(401).json({ message: 'Usuario ou Senha inválidos' });
    }
}

module.exports = {
    login
};