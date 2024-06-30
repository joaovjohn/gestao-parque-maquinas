const v = require('joi');

class DataServico {

    constructor(id, id_servico, dt_cadastro, dt_inicio, dt_final) {
        this.id = id;
        this.id_servico = id_servico;
        this.dt_cadastro = dt_cadastro;
        this.dt_inicio = dt_inicio;
        this.dt_final = dt_final;
    }

    static validate(dataServico) {
        const schema = v.object({
            id: v.number().integer().required(),
            id_servico: v.number().integer().required(),
            dt_cadastro: v.date().required(),
            dt_inicio: v.date(),
            dt_final: v.date()
        });

        return schema.validate(dataServico);
    }
}

module.exports = DataServico;