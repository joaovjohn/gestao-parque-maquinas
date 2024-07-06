const BaseService = require('./baseService');
const localidadeModel = require('../models/localidade');

class LocalidadeService extends BaseService{
    // cria os métodos de CRUD
    constructor() {
        super(localidadeModel);
    }
}

module.exports = new LocalidadeService();