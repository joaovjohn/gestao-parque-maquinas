const motoristaService = require('../services/motoristaService');

const index =  async (req, res) => {

  try {
    const motoristas = await motoristaService.getAllMotoristas();
    res.json({data: motoristas});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const create = async (req,res) => {
    try {
        const mot = req.body;
        const erro = await motoristaService.validacoesMotorista(mot);
        if (erro) {
            return res.status(erro.status).json(erro.json);
        }

        const newMotorista = await motoristaService.create(mot);
        res.status(201).json(newMotorista);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
  index,
  create

};