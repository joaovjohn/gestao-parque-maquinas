const supervisorService = require('../services/supervisorService');

const index =  async (req, res) => {
    try {
        const supervisors = await supervisorService.getSupervisor();
        return res.json(supervisors);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const show = async (req, res) => {
    try {
        const { id } = req.params;
        const supervisor = await supervisorService.getSupervisor(id);
        return res.json(supervisor);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const supervisor = req.body;
        const erro = await supervisorService.validacoesSupervisor(supervisor);
        if (erro) {
            return res.status(erro.status).json(erro.json);
        }
        await supervisorService.create(supervisor);
        return res.status(201).json({ message: 'Supervisor criado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const supervisor = req.body;
        await supervisorService.update(req.params.id, supervisor);
        return res.status(201).json({ message: 'Supervisor alterado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        await supervisorService.delete(req.params.id);
        return res.status(201).json({ message: 'Supervisor removido com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};