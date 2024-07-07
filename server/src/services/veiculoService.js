const BaseService = require('./baseService');
const veiculoModel = require('../models/veiculo');
const {db} = require("../config/connection");

class VeiculoService extends BaseService{
    // cria os métodos de CRUD
    constructor() {
        super(veiculoModel);
    }

    async getVeiculo(id = null) {
        const sql = `
            SELECT 
                v.id, 
                v.categoria, 
                v.placa, 
                v.status, 
                v.nome, 
                v.tipo_uso, 
                m.nome as marca
            FROM veiculo v
            LEFT JOIN marca m ON v.id_marca = m.id
        `;

        if (id) {
            return await db.query(sql + ' WHERE v.id = $1', [id]);
        }

        return await db.query(sql);
    }
}

module.exports = new VeiculoService();