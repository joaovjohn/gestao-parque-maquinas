const v = require('joi');

class Veiculo {
    // status
    static DISPONIVEL = 1;
    static EM_SERVICO = 2;
    static EM_MANUTENCAO = 3;

    static tableName = 'veiculo';

    constructor(id, categoria, placa, status, nome, id_marca, ano_fabricacao) {
        this.id = id;
        this.categoria = categoria;
        this.placa = placa;
        this.status = status;
        this.nome = nome;
        this.id_marca = id_marca;
        this.ano_fabricacao = ano_fabricacao;
    }

    static validate(veiculo) {
        const schema = v.object({
            categoria: v.string().max(50).required(),
            placa: v.string().length(7).allow(null).optional(),
            nome: v.string().max(256).required(),
            id_marca: v.number().integer().required(),
            ano_fabricacao: v.number().integer().optional()
        });

        const validation = schema.validate(veiculo,{ abortEarly: false });
        const orderedFields = Object.keys(schema.describe().keys);

        return { validation, orderedFields };
    }

    static validateUpdate(veiculo) {
        const schema = v.object({
            categoria: v.string().max(50).optional(),
            placa: v.string().length(7).allow(null).optional(),
            nome: v.string().max(256).optional(),
            id_marca: v.number().integer().optional(),
            ano_fabricacao: v.number().integer().optional()
        });

        const validation = schema.validate(veiculo,{ abortEarly: false });
        return { validation };
    }
}

module.exports = Veiculo;