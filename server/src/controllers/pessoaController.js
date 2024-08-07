const pessoaService = require('../services/pessoaService');
const bcrypt = require('bcryptjs');   

const index =  async (req, res) => {
  const fieldsToSelect = ['id' ,'status', 'cpf',  'data_nasc','email','login', 'nome'];

  try {
    const pessoas = await pessoaService.getAll(fieldsToSelect);
    res.json({data: pessoas});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const indexToCreate =  async (req, res) => {
  try {
    const pessoas = await pessoaService.getAllToCreate();
    res.json({data: pessoas});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const show =  async (req, res) => {
  const fieldsToSelect = ['id' ,'status', 'cpf', 'data_nasc','email','login', 'nome'];

  try {
    const pessoa = await pessoaService.getByPrimaryKey(req.params.id, fieldsToSelect);
    res.json({data: pessoa});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req,res) => {
  try {
    const pess = req.body;
    pess.senha = await bcrypt.hash(pess.senha, 10);
    const newPessoa = await pessoaService.create(pess);
    res.status(201).json({message: 'Pessoa criada com sucesso'});
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
}

const update = async (req,res) => {
  try {
    const pess = req.body;
    const pessoa = await pessoaService.update(req.params.id,pess);
    res.status(201).json({message: 'Pessoa atualizada com sucesso'});
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
}

const destroy = async (req,res) => {
  try {
    await pessoaService.deletePessoa(req.params.id)
    return res.status(201).json({message: 'Pessoa removida com sucesso'});  
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
    create,
    index,
    indexToCreate,
    show,
    update,
    destroy
};