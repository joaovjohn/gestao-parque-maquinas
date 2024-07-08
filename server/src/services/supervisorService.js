
const BaseService = require('./baseService');
const supervisorModel = require('../models/supervisor');
const { db } = require('../config/connection');
const pessoaService = require("./pessoaService");
const motoristaModel = require("../models/motorista");

class SupervisorService extends BaseService{
    // cria os métodos de CRUD
    constructor() {
        super(supervisorModel);
    }

    async getSupervisor(id = null) {
        const sql = `
            SELECT 
                p.id, 
                p.nome,
                s.descricao
            FROM supervisor s
            LEFT JOIN pessoa p ON s.pessoa_id = p.id
        `;

        if (id) {
            return await db.query(sql + ' WHERE s.pessoa_id = $1', [id]);
        }

        return await db.query(sql);
    }

    async update(id, supervisor) {

        const validate = supervisorModel.validateUpdate(supervisor);
        if (validate.validation.error) {
            const errorMessages = validate.validation.error.details.map(detail => detail.message);
            throw new Error(errorMessages.join(', '));
        }

        const fieldsToUpdate = supervisor;
        const paramsUpdateKey = Object.keys(fieldsToUpdate)
        const paramsUpdateValues = Object.values(fieldsToUpdate)
        const paramsUpdateCachorada = paramsUpdateKey.map((_, i) => `${paramsUpdateKey[i]} = $${i + 1}`).join(',');

        return await db.query(`UPDATE supervisor SET ${paramsUpdateCachorada} WHERE pessoa_id = ${id} RETURNING *`, paramsUpdateValues);
    }

    async delete(id) {
        const sql = `
            DELETE FROM supervisor WHERE pessoa_id = $1
        `;

        return await db.query(sql, [id]);
    }

    async validacoesSupervisor(supervisor) {
        const id = supervisor.pessoa_id;
        const pessoa = await pessoaService.getByPrimaryKey(id);

        if (pessoa.length === 0 || !pessoa[0]) {
            return {status: 404, json: {error: 'O supervisor não está cadastrado como pessoa no sistema'}};
        }

        const supervisorExistente = await this.getByField('pessoa_id', id);
        if (supervisorExistente.length > 0) {
            return {status: 409, json: {error: 'Supervisor já cadastrado'}};
        }
    }
}

module.exports = new SupervisorService();