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

    async createServico(servico) {
        const validate = this.model.validate(servicoModel);
        if (validate.validation.error) {
            const errorMessages = validate.validation.error.details.map(detail => detail.message);
            throw new Error(errorMessages.join(', '));
        }
        const erro = await this.validacoesServico(servico);
        if (erro) {
            return erro;
        }
        await this.create(servico);
        return {status: 201, json: {message: 'Serviço criado com sucesso'}};
    }

    async getAll(){
        return await db.query(`SELECT s.id, s.status, s.dt_inicio, s.dt_final, p.nome as motorista, v.placa, l.nome as localidade FROM servico s JOIN pessoa p ON s.motorista_id = p.id JOIN veiculo v ON s.veiculo_id = v.id JOIN localidade l ON s.localidade_id = l.id  ORDER BY s.id`);
    }

    async getAllAndamento(){
        return await db.query(`SELECT s.id, s.status, s.dt_inicio, s.dt_final, p.nome as motorista, v.placa, l.nome as localidade FROM servico s JOIN pessoa p ON s.motorista_id = p.id JOIN veiculo v ON s.veiculo_id = v.id JOIN localidade l ON s.localidade_id = l.id  WHERE s.status = '2'`);
    }

    async iniciar(id){
        const erro = await db.query(`UPDATE servico SET status = '2', dt_inicio = now() WHERE id = $1`, [id]);
        if (erro) {
            return erro;
        }
        return {message: 'Serviço iniciado com sucesso'};
    }

    async finalizar(id){
        const erro = await db.query(`UPDATE servico SET status = '3', dt_final = now() WHERE id = $1`, [id]);
        if (erro) {
            return erro;
        }
        return {message: 'Serviço finalizado com sucesso'};
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