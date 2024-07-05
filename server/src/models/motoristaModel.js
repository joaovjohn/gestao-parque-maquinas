const {db} = require('../config/connection');


const getAllMotoristas = () => {
    return db.any('SELECT pessoa_id ,num_cnh, categoria_cnh FROM motorista')
}  

const createMotorista = (motorista) => {
    return db.one('INSERT INTO motorista(pessoa_id ,num_cnh, categoria_cnh) VALUES($1, $2,$3) RETURNING *', [motorista.pessoa_id, motorista.num_cnh, motorista.categoria_cnh]);
};


module.exports = {
    getAllMotoristas,
    createMotorista
}