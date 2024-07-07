const v = require('joi');

class Supervisor {

    static tableName = 'supervisor';

    constructor(id, pessoa_id) {
        this.id = id;
        this.pessoa_id = pessoa_id;
    }

    static validate(supervisor) {
        const schema = v.object({
            pessoa_id: v.number().integer().required(),
            descricao: v.string().max(256)
        });

        const validation = schema.validate(supervisor,{ abortEarly: false });
        const orderedFields = Object.keys(schema.describe().keys);

        return { validation, orderedFields };
    }

    static validateUpdate(supervisor) {
        const schema = v.object({
            descricao:v.string().max(256)
        });

        const validation = schema.validate(supervisor,{ abortEarly: false });
        return { validation };
    }
}

module.exports = Supervisor;