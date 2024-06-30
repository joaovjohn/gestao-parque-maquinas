const v = require('joi');

class Supervisor {

    constructor(id, pessoa_id) {
        this.id = id;
        this.pessoa_id = pessoa_id;
    }

    static validate(supervisor) {
        const schema = v.object({
            id: v.number().integer().required(),
            pessoa_id: v.number().integer().required(),
        });

        return schema.validate(supervisor);
    }
}

module.exports = Supervisor;