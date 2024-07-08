const v = require('joi');
class Servico {

    // status
    static AGUARDANDO_EXECUCAO = 1;
    static EM_ANDAMENTO = 2;
    static CONCLUIDO = 3;

    // prioridades
    static ALTA = 1;
    static MEDIA = 2;
    static BAIXA = 3;

    static tableName = 'servico';

    constructor(status, dt_solicita, descricao, prioridade, localidade_id, motorista_id, veiculo_id, dt_inicio, dt_final) {
        this.status = status;
        this.dt_solicita = dt_solicita;
        this.descricao = descricao;
        this.prioridade = prioridade;
        this.localidade_id = localidade_id;
        this.motorista_id = motorista_id;
        this.veiculo_id = veiculo_id;
        this.dt_inicio = dt_inicio;
        this.dt_final = dt_final;
    }

    static validate(servico) {
        const schema = v.object({
            motorista_id: v.number().integer().required(),
            localidade_id: v.number().integer().required(),
            veiculo_id: v.number().integer().required(),
            descricao: v.string().max(200).required(),
            prioridade: v.number().integer().required(),
        });

        const validation = schema.validate(servico,{ abortEarly: false });
        const orderedFields = Object.keys(schema.describe().keys);

        return { validation, orderedFields };
    }

    static validadeUpdate(servico) {
        const schema = v.object({
            motorista_id: v.number().integer(),
            localidade_id: v.number().integer(),
            veiculo_id: v.number().integer(),
            descricao: v.string().max(200),
            prioridade: v.number().integer()
        });

        const validation = schema.validate(servico,{ abortEarly: false });

        return { validation };
    }

    static validateStart(servico) {
        const schema = v.object({
            dt_inicio: v.date().required()
        });

        const validation = schema.validate(servico,{ abortEarly: false });

        return { validation };
    }

    static validateFinish(servico) {
        const schema = v.object({
            dt_final: v.date().required()
        });

        const validation = schema.validate(servico,{ abortEarly: false });

        return { validation };
    }
}

module.exports = Servico;