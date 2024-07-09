const { func } = require('joi');
const servicoService = require('../services/servicoService');
const servicoModel = require('../models/servico');

async function create(req, res) {
    try {
        const servico = req.body;
        const result = await servicoService.create(servico);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function index(req, res) {
    try {
        const result = await servicoService.getAll();

        res.status(200).json({data: result});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getByAndamento(req, res) {
    try {
        const result = await servicoService.getAll(servicoModel.EM_ANDAMENTO);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function show(req, res) {
    try {
        const { id } = req.params;
        const result = await servicoService.show(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const servico = req.body;
        const result = await servicoService.update(id, servico);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function destroy(req, res) {
    try {
        const { id } = req.params;
        await servicoService.destroy(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function iniciar(req, res) {
    try {
        const { id } = req.params;
        const result = await servicoService.iniciar(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function finalizar(req, res) {
    try {
        const { id } = req.params;
        const result = await servicoService.finalizar(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getByAguardando(req, res) {
    try {
        const aguardando = await servicoService.getAll(servicoModel.AGUARDANDO_EXECUCAO);
        res.status(200).json(aguardando);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function getByFinalizadosOntem(req, res) {
    try {
        const ontem = await servicoService.getAllFinalizadosOntem();
        res.status(200).json(ontem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    getByAndamento,
    iniciar,
    finalizar,
    getByAguardando,
    getByFinalizadosOntem
};
