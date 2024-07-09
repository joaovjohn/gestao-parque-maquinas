const veiculoService = require('../services/veiculoService');
const veiculoModel = require('../models/veiculo');

const index =  async (req, res) => {

  try {
    const veiculo = await veiculoService.getVeiculo();
    return res.json({data: veiculo});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const show =  async (req, res) => {

  try {
    const veiculo = await veiculoService.getVeiculo(req.params.id);
    return res.json({data: veiculo});
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err.message });
  }
};

const create = async (req,res) => {
  try {
    const veic = req.body;
    const response = await veiculoService.createVeiculo(veic);
    return res.status(response.status).json(response.json);

  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err.message });
  }
};

const update = async (req,res) => {
  try {
    const veic = req.body;
    await veiculoService.update(req.params.id, veic);
    return res.status(201).json({message: 'Veiculo alterado com sucesso'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const destroy = async (req,res) => {
  try {
    await veiculoService.delete(req.params.id)
    return res.status(201).json({message: 'Veiculo removido com sucesso'});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const availableVehicles = async (req, res) => {
    try {
        const veiculos = await veiculoService.veiculosByStatus(veiculoModel.DISPONIVEL);
        res.json({data: veiculos});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const vehiclesOnDuty = async (req, res) => {
    try {
        const veiculos = await veiculoService.veiculosByStatus(veiculoModel.EM_SERVICO);
        res.json({data: veiculos});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    create,
    index, 
    show,
    update,
    destroy,
    availableVehicles,
    vehiclesOnDuty
};