const express = require('express');
const router = express.Router();
const motoristasController = require('./controllers/motoristasController');
const pessoasController = require('./controllers/pessoasController');

router.get('/status', (req, res) => {
    res.status(200).send({ status: 'ok' });
});

router.get('/pessoas', pessoasController.index);
router.get('/pessoas/:id', pessoasController.show);
router.post('/pessoas', pessoasController.create);
router.put('/pessoas/:id', pessoasController.update);
router.delete('/pessoas/:id', pessoasController.destroy);

router.get('/motoristas', motoristasController.index);
// router.get('/motoristas/:id', pessoaController.show);
router.post('/motoristas', motoristasController.create);
// router.put('/motoristas/:id', pessoaController.update);
// router.delete('/motoristas/:id', pessoaController.delete);


module.exports = router;