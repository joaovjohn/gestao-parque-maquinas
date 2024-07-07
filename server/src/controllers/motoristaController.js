const motoristaService = require('../services/motoristaService');

const index =  async (req, res) => {

  try {
    const motoristas = await motoristaService.getMotorista();
    res.json({data: motoristas});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const show =  async (req, res) => {
    try {
     const motorista = await motoristaService.getMotorista(req.params.id);
     res.json({data: motorista});
    } catch (err) {
     console.log(err)
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

const update = async (req, res) => {
    try {
        const mot = req.body;

        const updatedMotorista = await motoristaService.update(req.params.id, mot);
        res.json(updatedMotorista);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const destroy = async (req, res) => {
    try {
        await motoristaService.deleteMotorista(req.params.id)
        return res.status(201).json({message: 'Motorista removido com sucesso'});
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};