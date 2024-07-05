const {db} = require('../config/connection');

const getAll = () => {
    return db.any('SELECT id ,status, data_nasc,email,login, nome FROM pessoa')
}  

const getById = () => {
    return db.any('SELECT id ,status, data_nasc,email,login, nome FROM pessoa')
}  

const create = (pessoa) => {
    console.log(pessoa)
    try {
        return db.query('INSERT INTO pessoa(cpf,status, data_nasc,email,login, nome, senha) VALUES($1, $2,$3,$4,$5,$6,$7) RETURNING *', [ pessoa.cpf, pessoa.status, pessoa.data_nasc,pessoa.email,pessoa.login,pessoa.nome, pessoa.senha]);
    } catch (err) {
        console.log(err)
        return err
    }
};

const update = (pessoa) => {
    try {
        return db.query(' UPDATE pessoa set status = $1 RETURNING *', [pessoa.status]);
        
    } catch (err) {
        console.log(err);
        return err;
    }
    
};

const destroy = (id) => {
    try {
        return db.result('DELETE FROM pessoa where id = $1', [id]);
    } catch (error) {
        console.log(err);
        return err;
    }
}



module.exports = {
    getAll,
    create,
    getById,
    update,
    destroy
}