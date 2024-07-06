const express = require('express');
const router = express.Router();
const motoristasController = require('./controllers/motoristasController');
const pessoasController = require('./controllers/pessoasController');
const marcaController = require('./controllers/marcaController');
const localidadeController = require('./controllers/localidadeController');

router.get('/status', (req, res) => {
    res.status(200).send({ status: 'ok' });
});

// Rotas de pessoas
router.get('/pessoa', pessoasController.index);
router.get('/pessoa/:id', pessoasController.show);
router.post('/pessoa', pessoasController.create);
router.put('/pessoa/:id', pessoasController.update);
router.delete('/pessoa/:id', pessoasController.destroy);

// Rotas de motoristas
router.get('/motorista', motoristasController.index);
// router.get('/motorista/:id', pessoaController.show);
router.post('/motorista', motoristasController.create);
// router.put('/motorista/:id', pessoaController.update);
// router.delete('/motorista/:id', pessoaController.delete);

// Rotas de Marcas
router.get('/marca', marcaController.index);
router.get('/marca/:id', marcaController.show);
router.post('/marca', marcaController.create);
// router.put('/marca/:id', marcaController.update);
router.delete('/marca/:id', marcaController.destroy);

// Rotas de Localidades
router.get('/localidade', localidadeController.index);
router.get('/localidade/:id', localidadeController.show);
router.post('/localidade', localidadeController.create);
// router.put('/localidade/:id', localidadeController.update);
router.delete('/localidade/:id', localidadeController.destroy);


module.exports = router;