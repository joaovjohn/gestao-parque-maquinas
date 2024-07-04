const express = require('express');
const router = express.Router();
const motoristaController = require('./controllers/motoristasController');

router.get('/status', (req, res) => {
    res.status(200).send({ status: 'ok' });
});
router.get('/motoristas', motoristaController.index);
router.post('/motoristas', motoristaController.create);

module.exports = router;