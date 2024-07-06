const v = require('joi');
class VeiculoServico {

    static tableName = 'veiculo_servico';

    constructor(id, veiculo_id, servico_id, tempo, distancia) {
        this.id = id;
        this.veiculo_id = veiculo_id;
        this.servico_id = servico_id;
        this.tempo = tempo;
        this.distancia = distancia;
    }

    static validate(veiculoServico) {
        const schema = v.object({
            veiculo_id: v.number().integer().required(),
            servico_id: v.number().integer().required(),
            tempo: v.number().integer(),
            distancia: v.number().integer()
        });

        const validation = schema.validate(veiculoServico);
        const orderedFields = Object.keys(schema.describe().keys);

        return { validation, orderedFields };
    }
}

module.exports = VeiculoServico;