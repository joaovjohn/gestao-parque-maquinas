const v = require('joi');

class MotoristaServico {

    static tableName = 'motorista_servico';

    constructor(id, motorista_cnh, servico_id) {
        this.id = id;
        this.motorista_cnh = motorista_cnh;
        this.servico_id = servico_id;
    }

    static validate(motoristaServico) {
        const schema = v.object({
            motorista_cnh: v.string().length(11).required(),
            servico_id: v.number().integer().required(),
        });

        const validation = schema.validate(motoristaServico);
        const orderedFields = Object.keys(schema.describe().keys);
        return { validation, orderedFields };
    }
}

module.exports = MotoristaServico;