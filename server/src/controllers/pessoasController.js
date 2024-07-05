const pessoaModel = require('../models/pessoaModel');



const index =  async (req, res) => {
  try {
    const pessoas = await pessoaModel.getAll();
    res.json({data: pessoas});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const show =  async (req, res) => {
  try {
    const pessoa = await pessoaModel.getById(req.params.id);
    res.json({data: pessoa});
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

const create = async (req,res) => {
  try {
    const pess = req.body;
    const newPessoa = await pessoaModel.create(pess);
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
    await pessoaModel.destroy(req.params.id)
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