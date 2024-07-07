const v = require('joi');

class Marca {
    static tableName = 'marca';

    constructor(id, sigla, nome) {
        this.id = id;
        this.sigla = sigla;
        this.nome = nome;
    }

    static validate(marca) {
        const schema = v.object({
            sigla: v.string().max(256).required(),
            nome: v.string().max(256).required(),
        });

        const validation = schema.validate(marca,{ abortEarly: false });
        const orderedFields = Object.keys(schema.describe().keys);
        return { validation, orderedFields };
    }
}

module.exports = Marca;