const localidadeService = require('../services/localidadeService');

const index =  async (req, res) => {
    const fieldsToSelect = ['id' ,'nome', 'cidade', 'uf', 'pais'];

    try {
        const localidades = await localidadeService.getAll(fieldsToSelect);
        res.json({data: localidades});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const show =  async (req, res) => {

    const fieldsToSelect = ['id' ,'nome', 'cidade', 'uf', 'pais'];

    try {
        const localidade = await localidadeService.getByPrimaryKey(req.params.id, fieldsToSelect);
        res.json({data: localidade});
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

const create = async (req,res) => {

    try {
        const loc = req.body;
        console.log(loc);
        const newLocalidade = await localidadeService.create(loc);

        res.status(201).json(newLocalidade);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

// const update = async (req,res) => {
//     try {
//         const loc = req.body;
//         const localidade = await localidadeService.update(loc);
//         res.status(201).json(localidade);
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ error: err.message });
//     }
// }

const destroy = async (req,res) => {
    try {
        await localidadeService.delete(req.params.id)
        return res.status(201).json({message: 'Localidade removida com sucesso'});
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    create,
    index,
    show,
    // update,
    destroy
};