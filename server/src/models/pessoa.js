const v = require('joi');

class Pessoa {

    static DISPONIVEL = 1;
    static EM_SERVICO = 2;
    static INATIVO = 3;

    static tableName = 'pessoa';

    constructor(id, cpf, status, data_nasc, email, senha, login, nome) {
        this.id = id;
        this.cpf = cpf;
        this.status = status;
        this.data_nasc = data_nasc;
        this.email = email;
        this.senha = senha;
        this.login = login;
        this.nome = nome;
    }

    static validate(pessoa) {
        const schema = v.object({
            cpf: v.string().length(11).required(),
            data_nasc: v.date().allow(null),
            email: v.string().email().max(50).allow(null),
            senha: v.string().min(8).max(100).required(),
            login: v.string().max(50).required(),
            nome: v.string().max(256).required(),
        });

        const validation = schema.validate(pessoa,{ abortEarly: false });
        const orderedFields = Object.keys(schema.describe().keys);
        return { validation, orderedFields };
    }
}
module.exports = Pessoa;