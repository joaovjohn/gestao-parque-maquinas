const express = require('express');
const router = express.Router();
const motoristaController = require('./controllers/motoristaController');
const pessoaController = require('./controllers/pessoaController');
const marcaController = require('./controllers/marcaController');
const localidadeController = require('./controllers/localidadeController');
const veiculoController = require('./controllers/veiculoController');
const supervisorController = require('./controllers/supervisorController');

router.get('/status', (req, res) => {
    res.status(200).send({ status: 'ok' });
});

// Rotas de pessoas
router.get('/pessoa', pessoaController.index);
router.get('/pessoa/:id', pessoaController.show);
router.post('/pessoa', pessoaController.create);
router.put('/pessoa/:id', pessoaController.update);
router.delete('/pessoa/:id', pessoaController.destroy);

// Rotas de motoristas
router.get('/motorista', motoristaController.index);
router.get('/motorista/:id', motoristaController.show);
router.post('/motorista', motoristaController.create);
router.put('/motorista/:id', motoristaController.update);
router.delete('/motorista/:id', motoristaController.destroy);

// Rotas de Marcas
router.get('/marca', marcaController.index);
router.get('/marca/:id', marcaController.show);
router.post('/marca', marcaController.create);
router.put('/marca/:id', marcaController.update);
router.delete('/marca/:id', marcaController.destroy);

// Rotas de Localidades
router.get('/localidade', localidadeController.index);
router.get('/localidade/:id', localidadeController.show);
router.post('/localidade', localidadeController.create);
router.put('/localidade/:id', localidadeController.update);
router.delete('/localidade/:id', localidadeController.destroy);

// Rotas de Veiculos
router.get('/veiculo', veiculoController.index);
router.get('/veiculo/:id', veiculoController.show);
router.post('/veiculo', veiculoController.create);
router.put('/veiculo/:id', veiculoController.update);
router.delete('/veiculo/:id', veiculoController.destroy);

// Rotas de Supervisor
router.get('/supervisor', supervisorController.index);
router.get('/supervisor/:id', supervisorController.show);
router.post('/supervisor', supervisorController.create);
router.put('/supervisor/:id', supervisorController.update);
router.delete('/supervisor/:id', supervisorController.destroy);

module.exports = router;