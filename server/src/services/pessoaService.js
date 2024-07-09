const BaseService = require('./baseService');
const pessoaModel = require('../models/pessoa');
const { db } = require('../config/connection');

class PessoaService extends BaseService{
    // cria os métodos de CRUD
    constructor() {
        super(pessoaModel);
    }

    async getAllToCreate() {
        const sql = `
            SELECT 
                p.id, 
                p.nome,
                p.cpf,
                p.email,
                p.login,
                p.status,
            FROM pessoa p
            WHERE p.id NOT IN (SELECT pessoa_id FROM motorista)
            AND p.id NOT IN (SELECT pessoa_id FROM supervisor)
        `;

        return await db.query(sql);
    }

    async deletePessoa(id) {
        const motoristaService = require('./motoristaService');
        const motorista = await motoristaService.getByField('pessoa_id', id);
        if (motorista.length > 0) {
            await motoristaService.delete(id)
        }

        const supervisorService = require('./supervisorService');
        const supervisor = await supervisorService.getByField('pessoa_id', id);
        if (supervisor.length > 0) {
            await supervisorService.delete(id)
        }

        return await this.delete(id);
    }
}

module.exports = new PessoaService();