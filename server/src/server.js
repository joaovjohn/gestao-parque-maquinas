const app = require('./app');
const router = require('./router');

require('dotenv').config();

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

