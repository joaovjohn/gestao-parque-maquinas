const express = require('express');
const router = express.Router();
const motoristaController = require('./controllers/motoristasController');

router.get('/status', (req, res) => {
    res.status(200).send({ status: 'ok' });
});
router.get('/motoristas', motoristaController.getAll);

module.exports = router;