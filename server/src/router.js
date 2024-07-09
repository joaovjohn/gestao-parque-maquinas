const express = require('express');
const router = express.Router();
const authRouter = express.Router(); 
const auth = require('./middlewares/auth');
const passport = require('passport');
const motoristaController = require('./controllers/motoristaController');
const pessoaController = require('./controllers/pessoaController');
const marcaController = require('./controllers/marcaController');
const localidadeController = require('./controllers/localidadeController');
const veiculoController = require('./controllers/veiculoController');
const supervisorController = require('./controllers/supervisorController');

authRouter.use(passport.authenticate('jwt', { session: false }));

router.get('/status', (req, res) => {
    res.status(200).send({ status: 'ok' });
});

router.post('/login', auth.login);

// Rotas de pessoas
authRouter.get('/pessoa',passport.authenticate('jwt',{session: false}), pessoaController.index);
authRouter.get('/pessoa/:id', pessoaController.show);
authRouter.post('/pessoa', pessoaController.create);
authRouter.put('/pessoa/:id', pessoaController.update);
authRouter.delete('/pessoa/:id', pessoaController.destroy);

// Rotas de motoristas
authRouter.get('/motorista', motoristaController.index);
authRouter.get('/motorista/:id', motoristaController.show);
authRouter.post('/motorista', motoristaController.create);
authRouter.put('/motorista/:id', motoristaController.update);
authRouter.delete('/motorista/:id', motoristaController.destroy);
authRouter.get('/motoristas-disponiveis', motoristaController.availableDrivers);
authRouter.get('/motoristas-servico', motoristaController.driversOnDuty);

// Rotas de Marcas
authRouter.get('/marca', marcaController.index);
authRouter.get('/marca/:id', marcaController.show);
authRouter.post('/marca', marcaController.create);
authRouter.put('/marca/:id', marcaController.update);
authRouter.delete('/marca/:id', marcaController.destroy);

// Rotas de Localidades
authRouter.get('/localidade', localidadeController.index);
authRouter.get('/localidade/:id', localidadeController.show);
authRouter.post('/localidade', localidadeController.create);
authRouter.put('/localidade/:id', localidadeController.update);
authRouter.delete('/localidade/:id', localidadeController.destroy);

// Rotas de Veiculos
authRouter.get('/veiculo', veiculoController.index);
authRouter.get('/veiculo/:id', veiculoController.show);
authRouter.post('/veiculo', veiculoController.create);
authRouter.put('/veiculo/:id', veiculoController.update);
authRouter.delete('/veiculo/:id', veiculoController.destroy);
authRouter.get('/veiculos-disponiveis', veiculoController.availableVehicles);
authRouter.get('/veiculos-servico', veiculoController.vehiclesOnDuty)

// Rotas de Supervisor
authRouter.get('/supervisor', supervisorController.index);
authRouter.get('/supervisor/:id', supervisorController.show);
authRouter.post('/supervisor', supervisorController.create);
authRouter.put('/supervisor/:id', supervisorController.update);
authRouter.delete('/supervisor/:id', supervisorController.destroy);

router.use('/', authRouter);

module.exports = router;