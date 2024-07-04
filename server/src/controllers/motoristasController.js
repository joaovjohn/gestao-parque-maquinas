const Motorista = require('../models/motorista');
const {db} = require('../config/connection');


const index =  async (req, res) => {
    // conts motoristas = await Motorista.getAll();
    return res.status(200).json({ data : motoristas});
};

const getAll = async (req, res)  => {
    try {
        const courses = db.all('SELECT * from motorista');
        res.status(200).json(courses);
      }
      catch (err) {
        console.log(err)
        res.status(500).json({message:  err})
      }
};

module.exports = {
    index,
    getAll
};