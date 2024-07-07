const v = require('joi');

class Supervisor {

    static tableName = 'supervisor';

    constructor(id, pessoa_id) {
        this.id = id;
        this.pessoa_id = pessoa_id;
    }

    static validate(supervisor) {
        const schema = v.object({
            id: v.number().integer().required(),
            pessoa_id: v.number().integer().required(),
        });

        const validation = schema.validate(supervisor,{ abortEarly: false });
        const orderedFields = Object.keys(schema.describe().keys);

        return { validation, orderedFields };
    }
}

module.exports = Supervisor;