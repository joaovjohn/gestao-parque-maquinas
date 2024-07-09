const motoristaService = require('../services/motoristaService');
const pessoaModel = require('../models/pessoa');

const index =  async (req, res) => {

  try {
    const motoristas = await motoristaService.getMotorista();
    res.json({data: motoristas});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const show =  async (req, res) => {
    try {
     const motorista = await motoristaService.getMotorista(req.params.id);
     res.json({data: motorista});
    } catch (err) {
     console.log(err)
     res.status(500).json({ error: err.message });
    }
};

const create = async (req,res) => {
    try {
        const mot = req.body;
        const erro = await motoristaService.validacoesMotorista(mot);
        if (erro) {
            return res.status(erro.status).json(erro.json);
        }

        await motoristaService.create(mot);
        return res.status(201).json({ message: 'Motorista criado com sucesso' });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const mot = req.body;

        const updatedMotorista = await motoristaService.update(req.params.id, mot);
        return res.status(201).json({ message: 'Motorista atualizado com sucesso' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const destroy = async (req, res) => {
    try {
        await motoristaService.delete(req.params.id)
        return res.status(201).json({message: 'Motorista removido com sucesso'});
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const availableDrivers = async (req, res) => {
    try {
        const motoristas = await motoristaService.getMotoristaByStatus(pessoaModel.DISPONIVEL);
        res.json({data: motoristas});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const horasTrabalhadas = async (req, res) => {
    try {
        const motoristas = await motoristaService.horasTrabalhadas();
        res.json({data: motoristas});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
// motoristas em servico
const driversOnDuty = async (req, res) => {
    try {
        const motoristas = await motoristaService.getMotoristaByStatus(pessoaModel.EM_SERVICO);
        res.json({data: motoristas});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    availableDrivers,
    driversOnDuty,
    horasTrabalhadas
};