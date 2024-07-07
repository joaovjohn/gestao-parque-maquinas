const BaseService = require('./baseService');
const pessoaModel = require('../models/pessoa');

class PessoaService extends BaseService{
    // cria os métodos de CRUD
    constructor() {
        super(pessoaModel);
    }
}

module.exports = new PessoaService();