const v = require('joi');

class Motorista {
    constructor(pessoa_id, num_cnh, categoria_cnh) {
        this.pessoa_id = pessoa_id;
        this.num_cnh = num_cnh;
        this.categoria_cnh = categoria_cnh;
    }

    static validate(motorista) {
        const schema = v.object({
            pessoa_id: v.number().integer().required(),
            num_cnh: v.string().length(11).required(),
            categoria_cnh: v.string().length(2).required(),
        });

        return schema.validate(motorista);
    }
}

module.exports = Motorista;