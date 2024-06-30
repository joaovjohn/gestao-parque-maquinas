const v = require('joi');

class Localidade {
    constructor(id, nome, cidade, uf, pais, latitude, longitude) {
        this.id = id;
        this.nome = nome;
        this.cidade = cidade;
        this.uf = uf;
        this.pais = pais;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    static validate(localidade) {
        const schema = v.object({
            id: v.number().integer().required(),
            nome: v.string().max(256).required(),
            cidade: v.string().max(256).required(),
            uf: v.string().length(2).required(),
            pais: v.string().max(50).required(),
            latitude: v.string().max(50).allow(null),
            longitude: v.string().max(50).allow(null),
        });

        return schema.validate(localidade);
    }
}
module.exports = Localidade;