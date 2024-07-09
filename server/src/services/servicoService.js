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

    async getAll(status = null){
        const sql = `
            SELECT s.id, s.status as status_id ,
                CASE
                    WHEN s.status = ${servicoModel.AGUARDANDO_EXECUCAO} THEN 'AGUARDANDO EXECUCAO'
                    WHEN s.status = ${servicoModel.EM_ANDAMENTO} THEN 'EM ANDAMENTO'
                    WHEN s.status = ${servicoModel.CONCLUIDO} THEN 'CONCLUIDO'
                    ELSE 'Status desconhecido'
                    END as status ,
                s.prioridade as prioridade_id, 
                CASE
                    WHEN s.prioridade = ${servicoModel.ALTA} THEN 'ALTA'
                    WHEN s.prioridade = ${servicoModel.MEDIA} THEN 'MEDIA'
                    WHEN s.prioridade = ${servicoModel.BAIXA} THEN 'BAIXA'
                    ELSE 'Prioridade desconhecido'
                END as prioridade, 
                s.dt_inicio, 
                s.dt_final, 
                p.nome as motorista, 
                v.placa, l.nome as localidade 
            FROM servico s 
            JOIN pessoa p ON s.motorista_id = p.id 
            JOIN veiculo v ON s.veiculo_id = v.id 
            JOIN localidade l ON s.localidade_id = l.id  
            ORDER BY s.id`;

        if (status) {
            return await db.query(sql + ' WHERE s.status = $1', [status]);
        }

        return await db.query(sql);
    }

    async getAllAndamento(){
        return await db.query(`
            SELECT s.id, s.status as status_id,
                CASE
                    WHEN s.status = ${servicoModel.AGUARDANDO_EXECUCAO} THEN 'AGUARDANDO EXECUCAO'
                    WHEN s.status = ${servicoModel.EM_ANDAMENTO} THEN 'EM ANDAMENTO'
                    WHEN s.status = ${servicoModel.CONCLUIDO} THEN 'CONCLUIDO'
                    ELSE 'Status desconhecido'
                END as status ,
                s.dt_inicio, 
                s.dt_final, 
                p.nome as motorista, 
                v.placa, l.nome as localidade 
            FROM 
                servico s 
            JOIN pessoa p ON s.motorista_id = p.id 
            JOIN veiculo v ON s.veiculo_id = v.id 
            JOIN localidade l ON s.localidade_id = l.id 
            WHERE s.status = '${servicoModel.EM_ANDAMENTO}'`);
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

    async destroy(id){
        await db.query(`DELETE FROM servico WHERE id = $1`, [id]);
        return {message: 'Serviço removido com sucesso'};
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