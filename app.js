const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para aceitar JSON
app.use(express.json());

// Middleware para permitir requisições de outras origens (CORS)
app.use(cors());

// Importação das rotas
const userRoutes = require('./routes/userRoutes');
const notificacaoRoutes = require('./routes/notificacaoRoutes');
const salaRoutes = require('./routes/salaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

// Uso das rotas com prefixos
app.use('/usuarios', userRoutes);
app.use('/notificacoes', notificacaoRoutes);
app.use('/salas', salaRoutes);
app.use('/reservas', reservaRoutes);

// Rota base só para teste rápido
app.get('/', (req, res) => {
  res.send('API está rodando com sucesso!');
});

// Definição da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
