const v = require('joi');
class Servico {

    static PENDENTE = 1;
    static APROVADO = 2;
    static RECUSADO = 3;
    static EM_ANDAMENTO = 4;
    static FINALIZADO = 5;

    constructor(id, status, dt_solicita, descricao, prioridade, dt_aprovacao, usuario_aprovacao, supervisor_id, localidade_id, solicitante_id) {
        this.id = id;
        this.status = status;
        this.dt_solicita = dt_solicita;
        this.descricao = descricao;
        this.prioridade = prioridade;
        this.dt_aprovacao = dt_aprovacao;
        this.usuario_aprovacao = usuario_aprovacao;
        this.supervisor_id = supervisor_id;
        this.localidade_id = localidade_id;
        this.solicitante_id = solicitante_id;
    }

    static validate(servico) {
        const schema = v.object({
            id: v.number().integer().required(),
            status: v.number().integer().required(),
            dt_solicita: v.date().required(),
            descricao: v.string().max(200).required(),
            prioridade: v.number().integer().required(),
            dt_aprovacao: v.date().allow(null),
            usuario_aprovacao: v.number().integer().allow(null),
            supervisor_id: v.number().integer().allow(null),
            localidade_id: v.number().integer().required(),
            solicitante_id: v.number().integer().required()
        });

        return schema.validate(servico);
    }
}

module.exports = Servico;