
const BaseService = require('./baseService');
const marcaModel = require('../models/marca');

class MarcaService  extends BaseService{
    // cria os métodos de CRUD
    constructor() {
        super(marcaModel);
    }
}

module.exports = new MarcaService();