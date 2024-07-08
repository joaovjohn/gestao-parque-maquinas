const servicoService = require('../services/servicoService');

async function create(req, res) {
    try {
        const servico = req.body;

        const result = await servicoService.create(servico);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    create,
    // index,
    // show,
    // update,
    // destroy
};
