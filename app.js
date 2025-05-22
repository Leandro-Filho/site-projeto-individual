// app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Importa as rotas do diretório 'routes'

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota base para teste
app.get('/', (req, res) => {
  res.send('API está rodando com sucesso!');
});

// Usa as rotas definidas em 'routes/index.js'
app.use('/', routes);

module.exports = app;


