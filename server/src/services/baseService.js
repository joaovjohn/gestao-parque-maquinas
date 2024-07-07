
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
        return await db.query(`INSERT INTO ${this.model.tableName} (${fieldsString}) VALUES (${params}) RETURNING *`, values);

    }

    async getByField(whereField, whereValue, fieldsToSelect = '*') {
        if (fieldsToSelect !== '*') {
            fieldsToSelect = fieldsToSelect.join(',');
        }
        return await db.query(`SELECT ${fieldsToSelect} FROM ${this.model.tableName} WHERE ${whereField} = $1`, [whereValue]);
    }

    async getByPrimaryKey(id, fieldsToSelect = '*') {

        if (fieldsToSelect !== '*') {
            fieldsToSelect = fieldsToSelect.join(',');
        }

        return await db.query(`SELECT ${fieldsToSelect} FROM ${this.model.tableName} WHERE id = $1`, [id]);
    }

    async update(id,item) {
        const validate = this.model.validate(item);
        if (validate.error) {
            console.log(validate.details);
            throw new Error(validate.details[0].message);
        }
        const fieldsToUpdate = item;
        const paramsUpdateKey = Object.keys(fieldsToUpdate)
        const paramsUpdateValues = Object.values(fieldsToUpdate)
        const paramsUpdateCachorada = paramsUpdateKey.map((_, i) => `${paramsUpdateKey[i]} = $${i + 1}`).join(',');
        return await db.query(`UPDATE ${this.model.tableName} SET ${paramsUpdateCachorada} WHERE id = ${id} RETURNING *`, paramsUpdateValues);
    }

    async getAll(fieldsToSelect = '*') {
        if (fieldsToSelect !== '*') {
            fieldsToSelect = fieldsToSelect.join(',');
        }
        return await db.query(`SELECT ${fieldsToSelect} FROM ${this.model.tableName}`);
    }

    async delete(id) {
        return await db.query(`DELETE FROM ${this.model.tableName} WHERE id = $1`, [id]);
    }

}

module.exports = BaseService;