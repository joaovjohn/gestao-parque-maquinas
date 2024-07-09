const BaseService = require('./baseService');
const veiculoModel = require('../models/veiculo');
const {db} = require("../config/connection");
const marcaService = require("./marcaService");

class VeiculoService extends BaseService{
    // cria os métodos de CRUD
    constructor() {
        super(veiculoModel);
    }

    async createVeiculo(veiculo) {
        const validacao = await marcaService.getByPrimaryKey(veiculo.id_marca);
        if (validacao.length === 0) {
            return {status: 404, json: {error: 'A marca não está cadastrada no sistema'}};
        }

        await this.create(veiculo);
        return {status: 201, json: {message: 'Veiculo criado com sucesso'}};
    }

    async getVeiculo(id = null) {
        const sql = `
            SELECT 
                v.id, 
                v.categoria, 
                v.placa, 
                v.status, 
                v.nome, 
                v.ano_fabricacao, 
                m.nome as marca
            FROM veiculo v
            LEFT JOIN marca m ON v.id_marca = m.id
        `;

        if (id) {
            return await db.query(sql + ' WHERE v.id = $1', [id]);
        }

        return await db.query(sql);
    }

    async horas() {
        const sql = `
             SELECT 
                v.id, 
                v.categoria, 
                v.placa, 
                v.status, 
                v.nome as veiculo, 
                v.ano_fabricacao, 
                m.nome as marca,
                SUM(EXTRACT(EPOCH FROM (s.dt_final - s.dt_inicio))/3600) as horas
            FROM veiculo v
            LEFT JOIN marca m ON v.id_marca = m.id
            LEFT JOIN servico s ON v.id = s.veiculo_id
            GROUP BY v.id, m.nome
        `;

        return await db.query(sql);
    }

    async veiculosByStatus(status, id = null) {
        const sql = `
            SELECT
                v.id,
                v.categoria,
                v.placa,
                v.status,
                v.nome,
                v.ano_fabricacao,
                m.nome as marca
            FROM veiculo v
            LEFT JOIN marca m ON v.id_marca = m.id
            WHERE v.status = $1
        `;

        if (id) {
            return await db.query(sql + ' AND v.id = $2', [status, id]);
        }

        return await db.query(sql, [status]);
    }
}

module.exports = new VeiculoService();