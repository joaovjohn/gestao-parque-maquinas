const v = require('joi');

class MotoristaServico {
    constructor(id, motorista_cnh, servico_id) {
        this.id = id;
        this.motorista_cnh = motorista_cnh;
        this.servico_id = servico_id;
    }

    static validate(motoristaServico) {
        const schema = v.object({
            id: v.number().integer().required(),
            motorista_cnh: v.string().length(11).required(),
            servico_id: v.number().integer().required(),
        });

        return schema.validate(motoristaServico);
    }
}

module.exports = MotoristaServico;