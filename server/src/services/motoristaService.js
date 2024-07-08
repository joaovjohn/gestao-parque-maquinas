
const BaseService = require('./baseService');
const motoristaModel = require('../models/motorista');
const { db } = require('../config/connection');
const pessoaService = require("./pessoaService");
const pessoaModel = require('../models/pessoa');

class MotoristaService extends BaseService{
    // cria os métodos de CRUD
    constructor() {
        super(motoristaModel);
    }

    async getMotorista(id = null) {
        const sql = `
            SELECT 
                p.id, 
                p.nome,
                num_cnh,
                m.categoria_cnh
            FROM motorista m
            LEFT JOIN pessoa p ON m.pessoa_id = p.id
        `;

        if (id) {
            return await db.query(sql + ' WHERE m.pessoa_id = $1', [id]);
        }

        return await db.query(sql);
    }

    async update(id, mot) {

        const validate = motoristaModel.validateUpdate(mot);
        if (validate.validation.error) {
            const errorMessages = validate.validation.error.details.map(detail => detail.message);
            throw new Error(errorMessages.join(', '));
        }

        const fieldsToUpdate = mot;
        const paramsUpdateKey = Object.keys(fieldsToUpdate)
        const paramsUpdateValues = Object.values(fieldsToUpdate)
        const paramsUpdateCachorada = paramsUpdateKey.map((_, i) => `${paramsUpdateKey[i]} = $${i + 1}`).join(',');

        return await db.query(`UPDATE motorista SET ${paramsUpdateCachorada} WHERE pessoa_id = ${id} RETURNING *`, paramsUpdateValues);
    }

    async delete(id) {
        const sql = `
            DELETE FROM motorista WHERE pessoa_id = $1
        `;

        return await db.query(sql, [id]);
    }

    async motoristaDisponivel(id = null) {

        const sql = `
            SELECT 
                p.id, 
                p.nome,
                m.num_cnh,
                m.categoria_cnh
            FROM motorista m
            LEFT JOIN pessoa p ON m.pessoa_id = p.id
            WHERE p.status = ${pessoaModel.DISPONIVEL}
        `;

        if (id) {
            return await db.query(sql + ' AND m.pessoa_id = $1', [id]);
        }

        return await db.query(sql);
    }

    async validacoesMotorista(mot) {
        const id = mot.pessoa_id;
        const pessoa = await pessoaService.getByPrimaryKey(id);

        if (pessoa.length === 0 || !pessoa[0]) {
            return {status: 404, json: {error: 'O motorista não está cadastrado como pessoa no sistema'}};
        }

        const motoristaExistente = await this.getByField('pessoa_id', id);
        if (motoristaExistente.length > 0) {
            return {status: 409, json: {error: 'Motorista já cadastrado'}};
        }

        const cnhCadastrada = await this.getByField('num_cnh', mot.num_cnh);
        if (cnhCadastrada.length > 0) {
            return {status: 409, json: {error: 'CNH já cadastrada'}};
        }
    }
}

module.exports = new MotoristaService();