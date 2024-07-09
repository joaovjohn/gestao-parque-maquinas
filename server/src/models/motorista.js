const v = require('joi');

class Motorista {

    static tableName = 'motorista';

    constructor(pessoa_id, num_cnh, categoria_cnh) {
        this.pessoa_id = pessoa_id;
        this.num_cnh = num_cnh;
        this.categoria_cnh = categoria_cnh;
    }

    static validate(motorista) {
        const schema = v.object({
            pessoa_id: v.number().integer().required(),
            num_cnh: v.string().length(11).required(),
            categoria_cnh: v.string().max(2).required(),
        });

        const validation = schema.validate(motorista,{ abortEarly: false });
        const orderedFields = Object.keys(schema.describe().keys);
        return { validation, orderedFields };
    }

    static validateUpdate(motorista) {
        const schema = v.object({
            num_cnh: v.string().length(11),
            categoria_cnh: v.string().max(2),
        });

        const validation = schema.validate(motorista,{ abortEarly: false });
        return { validation };
    }
}

module.exports = Motorista;