
const { db } = require('../config/connection');

class BaseService {
    constructor(model) {
        this.model = model;
    }

    async create(item) {

        // faz a validacao dos campos do item
        const validate = this.model.validate(item);
        if (validate.error) {
            throw new Error(validate.details[0].message);
        }

        const fieldsToInsert = item;

        // pega os campos ordenados
        const orderedFields = validate.orderedFields;

        // pega os valores dos campos ordenados
        const values = orderedFields.map(field => fieldsToInsert[field]);

        // gera uma string com a quantidade de parametros necessarios $1, $2, $3
        const params = orderedFields.map((_, i) => `$${i + 1}`).join(',');

        // gera uma string com os campos separados por virgula para inserir
        const fieldsString = orderedFields.join(',');

        const result = await db.query(`INSERT INTO ${this.model.tableName} (${fieldsString}) VALUES (${params}) RETURNING *`, values);

        // validacao para saber se teve sucesso ou nao
        if (result.rowCount === 0) {
            throw new Error('Erro ao inserir item no banco de dados');
        }

        return result;
    }

    async getAll() {
        const result = await db.query(`SELECT * FROM ${this.model.tableName}`);
        return result.rows;
    }

    async getById(id) {
        const result = await db.query(`SELECT * FROM ${this.model.tableName} WHERE id = $1`, [id]);
        return result.rows[0];
    }

    async update(id, item) {
        const { error } = this.model.validate(item);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await db.query(`UPDATE ${this.model.tableName} SET nome = $1 WHERE id = $2 RETURNING *`, [item, id]);
        return result.rows[0];
    }

    async delete(id) {
        await db.query(`DELETE FROM ${this.model.tableName} WHERE id = $1`, [id]);
    }
}

module.exports = BaseService;