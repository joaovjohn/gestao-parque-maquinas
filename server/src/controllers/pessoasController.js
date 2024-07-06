const pessoaService = require('../services/pessoaService');

const index =  async (req, res) => {
  const fieldsToSelect = ['id' ,'status', 'data_nasc','email','login', 'nome'];

  try {
    const pessoas = await pessoaService.getAll(fieldsToSelect);
    res.json({data: pessoas});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const show =  async (req, res) => {
  const fieldsToSelect = ['id' ,'status', 'data_nasc','email','login', 'nome'];

  try {
    const pessoa = await pessoaService.getByPrimaryKey(req.params.id, fieldsToSelect);
    res.json({data: pessoa});
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

const create = async (req,res) => {
  try {
    const pess = req.body;
    const newPessoa = await pessoaService.create(pess);

    res.status(201).json(newPessoa);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
}

const update = async (req,res) => {
  try {
    const pess = req.body;
    const pessoa = await pessoaModel.update(pess);
    res.status(201).json(pessoa);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
}

const destroy = async (req,res) => {
  try {
    await pessoaService.delete(req.params.id)
    return res.status(201).json({message: 'Pessoa removida com sucesso'});  
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
    create,
    index, 
    show,
    update,
    destroy
};