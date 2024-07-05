const motoristaModel = require('../models/motoristaModel');



const index =  async (req, res) => {
  try {
    const motoristas = await motoristaModel.getAllMotoristas();
    res.json({data: motoristas});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const show =  async (req, res) => {
  try {
    const motoristas = await motoristaModel.getMotoristaById(req.id);
    res.json({data: motoristas});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const create = async (req,res) => {
  try {
    const newMotorista = await motoristaModel.createMotorista(req.body);
    res.status(201).json(newMotorista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
    index, create

};