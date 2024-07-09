const servicoService = require('../services/servicoService');
const servicoModel = require('../models/servico');

async function create(req, res) {
    try {
        const servico = req.body;

        const result = await servicoService.createServico(servico);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function startServico(req, res) {
    try {
        const { id } = req.params;
        const result = await servicoService.startServico(id);
        res.status(result.status).json(result.json);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function endServico(req, res) {
    try {
        const { id } = req.params;
        const result = await servicoService.endServico(id);
        return res.status(result.status).json(result.json);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function destroy(req, res) {
    try {
        const { id } = req.params;
        const status = await servicoService.getByField('id', id, 'status')
        if ([servicoModel.EM_ANDAMENTO, servicoModel.CONCLUIDO].includes(status)) {
            return res.status(400).json({ message: 'Não é possível remover um serviço em andamento ou concluído' });
        }
        await servicoService.delete(id);
        return res.status(200).json('Serviço removido com sucesso');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    create,
    startServico,
    endServico,
    // index,
    // show,
    // update,
    destroy
};
