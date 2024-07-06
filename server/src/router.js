const express = require('express');
const router = express.Router();
const motoristasController = require('./controllers/motoristasController');
const pessoasController = require('./controllers/pessoasController');

router.get('/status', (req, res) => {
    res.status(200).send({ status: 'ok' });
});

router.get('/pessoa', pessoasController.index);
router.get('/pessoa/:id', pessoasController.show);
router.post('/pessoa', pessoasController.create);
router.put('/pessoa/:id', pessoasController.update);
router.delete('/pessoa/:id', pessoasController.destroy);

router.get('/motorista', motoristasController.index);
// router.get('/motorista/:id', pessoaController.show);
router.post('/motorista', motoristasController.create);
// router.put('/motorista/:id', pessoaController.update);
// router.delete('/motorista/:id', pessoaController.delete);

module.exports = router;