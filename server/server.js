const express = require('express');
const cors = require('cors');
const router = require('./src/router');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();
const { db } = require('./src/config/connection');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
    const user =  async () => await db.oneOrNone(`SELECT id FROM pessoa WHERE id = $1`, jwt_payload.id); 
    const supervisor = async () => await db.oneOrNone(`SELECT pessoa_id FROM supervisor WHERE pessoa_id = $1`, jwt_payload.id); 
    const motorista = async () =>  await db.oneOrNone(`SELECT pessoa_id FROM motorista WHERE pessoa_id = $1`, jwt_payload.id); 
    user.role = supervisor ? 'supervisor' : motorista ? 'motorista' : 'pessoa';
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
    })
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/api', router);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
