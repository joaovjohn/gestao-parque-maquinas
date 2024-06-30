const v = require('joi');

class Veiculo {
    static DISPONIVEL = 1;
    static EM_SERVICO = 2;
    static EM_MANUTENCAO = 3;

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
            id: v.number().integer().required(),
            categoria: v.string().max(50).required(),
            placa: v.string().length(7).allow(null),
            status: v.number().integer().required(),
            nome: v.string().max(256).required(),
            tipo_uso: v.number().integer().required(),
            id_marca: v.number().integer().required(),
        });

        return schema.validate(veiculo);
    }
}

module.exports = Veiculo;