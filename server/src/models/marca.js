const v = require('joi');

class Marca {
    constructor(id, sigla, nome) {
        this.id = id;
        this.sigla = sigla;
        this.nome = nome;
    }

    static validate(marca) {
        const schema = v.object({
            id: v.number().integer().required(),
            sigla: v.string().max(256).required(),
            nome: v.string().max(256).required(),
        });

        return schema.validate(marca);
    }
}

module.exports = Marca;