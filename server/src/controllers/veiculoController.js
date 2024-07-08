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
    return res.status(201).json({message: 'Veiculo criado com sucesso'});

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

const update = async (req,res) => {
  try {
    const veic = req.body;
    const updatedVeiculo = await veiculoService.update(req.params.id, veic);
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
        const veiculos = await veiculoService.veiculoDisponivel();
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
    availableVehicles
};