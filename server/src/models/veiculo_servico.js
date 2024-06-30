=const v = require('joi');
class VeiculoServico {
    constructor(id, veiculo_id, servico_id, tempo, distancia) {
        this.id = id;
        this.veiculo_id = veiculo_id;
        this.servico_id = servico_id;
        this.tempo = tempo;
        this.distancia = distancia;
    }

    static validate(veiculoServico) {
        const schema = v.object({
            id: v.number().integer().required(),
            veiculo_id: v.number().integer().required(),
            servico_id: v.number().integer().required(),
            tempo: v.number().integer(),
            distancia: v.number().integer()
        });

        return schema.validate(veiculoServico);
    }
}

module.exports = VeiculoServico;