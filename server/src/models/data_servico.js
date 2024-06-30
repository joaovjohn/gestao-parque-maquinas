/*

CREATE TABLE IF NOT EXISTS public.data_servico (
    id serial NOT NULL,
    id_servico integer NOT NULL,
    dt_cadastro timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    dt_inicio timestamp,
    dt_final timestamp,
CONSTRAINT pk_data_servico PRIMARY KEY (id),
CONSTRAINT fk_data_servico FOREIGN KEY (id_servico) REFERENCES public.servico(id)
);
*/
const v = require('joi');

class DataServico {

    constructor(id, id_servico, dt_cadastro, dt_inicio, dt_final) {
        this.id = id;
        this.id_servico = id_servico;
        this.dt_cadastro = dt_cadastro;
        this.dt_inicio = dt_inicio;
        this.dt_final = dt_final;
    }

    static validate(dataServico) {
        const schema = v.object({
            id: v.number().integer().required(),
            id_servico: v.number().integer().required(),
            dt_cadastro: v.date().required(),
            dt_inicio: v.date(),
            dt_final: v.date()
        });

        return schema.validate(dataServico);
    }
}

module.exports = DataServico;