const Motorista = require('../models/Motorista');
const db = require('../config/connection');


const index =  async (req, res) => {
    // conts motoristas = await Motorista.getAll();
    return res.status(200).json({ data : motoristas});
};
const getAll = async () => {
    const moto = await db.query('SELECT * FROM motorista');
    return res.status(200).json({ data : moto});

};
module.exports = {
    index,
    getAll
};