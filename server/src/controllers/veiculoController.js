const veiculoService = require('../services/veiculoService');
const marcaService = require('../services/marcaService');

const index =  async (req, res) => {

  try {
    const veiculo = await veiculoService.getVeiculo();


    res.json({data: veiculo});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const show =  async (req, res) => {

  try {
    const veiculo = await veiculoService.getVeiculo(req.params.id);
    res.json({data: veiculo});
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

const create = async (req,res) => {
  try {
    const veic = req.body;
    const newVeiculo = await veiculoService.create(veic);
    res.status(201).json(newVeiculo);

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

const update = async (req,res) => {
  try {
    const veic = req.body;
    const updatedVeiculo = await veiculoService.update(req.params.id, veic);
    res.json(updatedVeiculo);
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

module.exports = {
    create,
    index, 
    show,
    update,
    destroy
};