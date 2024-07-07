const v = require('joi');

class DataServico {

    static tableName = 'data_servico';

    constructor(id, id_servico, dt_cadastro, dt_inicio, dt_final) {
        this.id = id;
        this.id_servico = id_servico;
        this.dt_cadastro = dt_cadastro;
        this.dt_inicio = dt_inicio;
        this.dt_final = dt_final;
    }

    static validate(dataServico) {
        const schema = v.object({
            id_servico: v.number().integer().required(),
            dt_cadastro: v.date().required(),
            dt_inicio: v.date(),
            dt_final: v.date()
        });

        const validation = schema.validate(dataServico,{ abortEarly: false });
        const orderedFields = Object.keys(schema.describe().keys);
        return { validation, orderedFields };
    }
}

module.exports = DataServico;