const BaseService = require('./baseService');
const veiculoModel = require('../models/veiculo');

class VeiculoService extends BaseService{
    // cria os métodos de CRUD
    constructor() {
        super(veiculoModel);
    }
}

module.exports = new VeiculoService();