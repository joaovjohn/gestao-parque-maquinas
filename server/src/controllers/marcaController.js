const marcaService = require('../services/marcaService');

const index = async (req, res) => {
    const fieldsToSelect = ['id', 'sigla', 'nome'];

    try {
        const marcas = await marcaService.getAll(fieldsToSelect);
        res.json({ data: marcas });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const show = async (req, res) => {
    const fieldsToSelect = ['id', 'sigla', 'nome'];

    try {
        const marca = await marcaService.getByPrimaryKey(req.params.id, fieldsToSelect);
        res.json({ data: marca });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

const create = async (req, res) => {
    try {
        const marca = req.body;
        await marcaService.create(marca);

        return res.status(201).json({ message: 'Marca criada com sucesso' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const marca = req.body;
        await marcaService.update(req.params.id, marca);
        return res.status(201).json({ message: 'Marca atualizada com sucesso' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

const destroy = async (req, res) => {
    try {
        await marcaService.delete(req.params.id)
        return res.status(201).json({ message: 'Marca removida com sucesso' });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    create,
    index,
    show,
    update,
    destroy
}
