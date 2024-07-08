const BaseService = require('./baseService');
const servicoModel = require('../models/servico');
const serviceLocalidade = require('./localidadeService');
const servicePessoa = require('./pessoaService');
const serviceSupervisor = require('./supervisorService');
const motoristaService = require('./motoristaService');
const veiculoService = require('./veiculoService');

const {db} = require("../config/connection");
const v = require("joi");

class ServicoService extends BaseService{
    // cria os métodos de CRUD
    constructor() {
        super(servicoModel);
    }

    async create(servico) {
        const validate = this.model.validate(servicoModel);
        if (validate.validation.error) {
            const errorMessages = validate.validation.error.details.map(detail => detail.message);
            throw new Error(errorMessages.join(', '));
        }

        const erro = await this.validacoesServico(servico);
        if (erro) {
            return erro;
        }

        const sql = `
            INSERT INTO servico (status, dt_solicita, descricao, prioridade, localidade_id, motorista_id, veiculo_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const { descricao, prioridade, localidade_id, motorista_id, veiculo_id } = servico;
        const values = [servicoModel.AGUARDANDO_EXECUCAO, new Date(), descricao, prioridade, localidade_id, motorista_id, veiculo_id];
        await db.query(sql, values);

        return {status: 201, json: {message: 'Serviço criado com sucesso'}};
    }

    async validacoesServico(servico) {

        const validate = this.model.validate(servicoModel);
        if (validate.validation.error) {
            const errorMessages = validate.validation.error.details.map(detail => detail.message);
            throw new Error(errorMessages.join(', '));
        }

        if (servico.localidade_id) {
            const localidade = await serviceLocalidade.getByPrimaryKey(servico.localidade_id);
            if (!localidade || localidade.length === 0) {
                return {status: 404, json: {error: 'A localidade não está cadastrada no sistema'}};
            }
        }

        if (!servico.motorista_id) {
            return {status: 400, json: {error: 'O motorista é obrigatório'}};
        }
        const motorista = await motoristaService.motoristaDisponivel(servico.motorista_id);
        if (!motorista || motorista.length === 0) {
            return {status: 404, json: {error: 'O motorista não está disponível'}};
        }

        if (!servico.veiculo_id) {
            return {status: 400, json: {error: 'O veículo é obrigatório'}};
        }
        const veiculo = await veiculoService.veiculoDisponivel(servico.veiculo_id);
        if (!veiculo || veiculo.length === 0) {
            return {status: 404, json: {error: 'O veículo não está disponível'}};
        }
    }
}

module.exports = new ServicoService();