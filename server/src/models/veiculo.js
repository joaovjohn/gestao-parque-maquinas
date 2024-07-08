const v = require('joi');

class Veiculo {
    // status
    static DISPONIVEL = 1;
    static EM_SERVICO = 2;
    static EM_MANUTENCAO = 3;

    // tipo_uso
    static VEICULO = 1;
    static MAQUINA = 2;

    static tableName = 'veiculo';

    constructor(id, categoria, placa, status, nome, tipo_uso, id_marca) {
        this.id = id;
        this.categoria = categoria;
        this.placa = placa;
        this.status = status;
        this.nome = nome;
        this.tipo_uso = tipo_uso;
        this.id_marca = id_marca;
    }

    static validate(veiculo) {
        const schema = v.object({
            categoria: v.string().max(50).required(),
            placa: v.string().length(7).allow(null).optional(),
            nome: v.string().max(256).required(),
            tipo_uso: v.number().integer().required(),
            id_marca: v.number().integer().required(),
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
            tipo_uso: v.number().integer().optional(),
            id_marca: v.number().integer().optional(),
        });

        const validation = schema.validate(veiculo,{ abortEarly: false });
        return { validation };
    }
}

module.exports = Veiculo;