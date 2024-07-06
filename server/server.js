const express = require('express');
const router = require('./src/router');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
