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
const servicoController = require('./controllers/servicoController');

authRouter.use(passport.authenticate('jwt', { session: false }));

router.get('/status', (req, res) => {
    res.status(200).send({ status: 'ok' });
});

function checkRole(roles) {
    return function(req, res,next) {
        if (req.user && roles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).send({ message: 'Acesso negado' });
        }
    }
}
router.post('/login', auth.login);

// Rotas de pessoas
authRouter.get('/pessoa',checkRole([ 'supervisor']), pessoaController.index);
authRouter.get('/pessoa-criar',checkRole([ 'supervisor']), pessoaController.indexToCreate);
authRouter.get('/pessoa/:id',checkRole([ 'supervisor']), pessoaController.show);
authRouter.post('/pessoa',checkRole([ 'supervisor']), pessoaController.create);
authRouter.put('/pessoa/:id',checkRole([ 'supervisor']), pessoaController.update);
authRouter.delete('/pessoa/:id',checkRole(['supervisor']), pessoaController.destroy);

// Rotas de motoristas
authRouter.get('/motorista',checkRole([ 'motorista','supervisor']), motoristaController.index);
authRouter.get('/motorista/:id',checkRole(['motorista', 'supervisor']), motoristaController.show);
authRouter.post('/motorista',checkRole([ 'supervisor']), motoristaController.create);
authRouter.put('/motorista/:id',checkRole(['supervisor']), motoristaController.update);
authRouter.delete('/motorista/:id',checkRole([ 'supervisor']), motoristaController.destroy);
authRouter.get('/motoristas-disponiveis',checkRole(['motorista', 'supervisor']), motoristaController.availableDrivers);
authRouter.get('/motoristas-servico',checkRole(['motorista', 'supervisor']), motoristaController.driversOnDuty);
authRouter.get('/motoristas-aguardando',checkRole(['motorista', 'supervisor']), motoristaController.inativos);
authRouter.get('/motorista-horas-trabalhadas',checkRole(['motorista', 'supervisor']), motoristaController.horasTrabalhadas);

// Rotas de Marcas
authRouter.get('/marca',checkRole(['motorista', 'supervisor']), marcaController.index);
authRouter.get('/marca/:id',checkRole(['motorista', 'supervisor']), marcaController.show);
authRouter.post('/marca',checkRole([ 'supervisor']), marcaController.create);
authRouter.put('/marca/:id',checkRole(['supervisor']), marcaController.update);
authRouter.delete('/marca/:id',checkRole([ 'supervisor']), marcaController.destroy);

// Rotas de Localidades
authRouter.get('/localidade',checkRole(['motorista', 'supervisor']), localidadeController.index);
authRouter.get('/localidade/:id',checkRole(['motorista', 'supervisor']), localidadeController.show);
authRouter.post('/localidade',checkRole([ 'supervisor']), localidadeController.create);
authRouter.put('/localidade/:id',checkRole([ 'supervisor']), localidadeController.update);
authRouter.delete('/localidade/:id',checkRole([ 'supervisor']), localidadeController.destroy);

// Rotas de Veiculos
authRouter.get('/veiculo',checkRole(['motorista', 'supervisor']), veiculoController.index);
authRouter.get('/veiculo/:id',checkRole(['motorista', 'supervisor']), veiculoController.show);
authRouter.post('/veiculo',checkRole(['supervisor']), veiculoController.create);
authRouter.put('/veiculo/:id',checkRole(['supervisor']), veiculoController.update);
authRouter.delete('/veiculo/:id',checkRole(['supervisor']), veiculoController.destroy);
authRouter.get('/veiculos-disponiveis',checkRole(['motorista', 'supervisor']), veiculoController.availableVehicles);
authRouter.get('/veiculos-servico',checkRole(['motorista', 'supervisor']), veiculoController.vehiclesOnDuty)
authRouter.get('/veiculo-horas',checkRole(['motorista', 'supervisor']), veiculoController.horas)

// Rotas de Supervisor
authRouter.get('/supervisor',checkRole([ 'supervisor']), supervisorController.index);
authRouter.get('/supervisor/:id',checkRole([ 'supervisor']), supervisorController.show);
authRouter.post('/supervisor',checkRole([ 'supervisor']), supervisorController.create);
authRouter.put('/supervisor/:id',checkRole([ 'supervisor']), supervisorController.update);
authRouter.delete('/supervisor/:id',checkRole([ 'supervisor']), supervisorController.destroy);

// Rotas de Supervisor
authRouter.get('/servico',checkRole(['motorista', 'supervisor']), servicoController.index);
authRouter.get('/servico/:id',checkRole(['motorista', 'supervisor']), servicoController.show);
authRouter.get('/servico-andamento',checkRole(['motorista', 'supervisor']), servicoController.getByAndamento);
authRouter.get('/servico-aguardando',checkRole(['motorista', 'supervisor']), servicoController.getByAguardando);
authRouter.get('/servico-finalizados-ontem',checkRole(['motorista', 'supervisor']), servicoController.getByFinalizadosOntem);
authRouter.post('/servico',checkRole([ 'supervisor']), servicoController.create);
authRouter.put('/servico/:id/iniciar',checkRole(['motorista', 'supervisor']), servicoController.iniciar);
authRouter.put('/servico/:id/finalizar',checkRole(['motorista', 'supervisor']), servicoController.finalizar);
authRouter.put('/servico/:id',checkRole(['motorista', 'supervisor']), servicoController.update);
authRouter.delete('/servico/:id',checkRole(['supervisor']), servicoController.destroy);

router.use('/', authRouter);

module.exports = router;