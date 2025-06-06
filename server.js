const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente do .env
dotenv.config();

// Inicializa o app
const app = express();
const PORT = process.env.PORT || 3000;

// Configura EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para ler dados de formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos (ex: CSS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da aplicação (ajuste os nomes conforme seus arquivos)
const userRoutes = require('./src/routes/userRoutes');
const reservaRoutes = require('./src/routes/reservaRoutes');
const salaRoutes = require('./src/routes/salaRoutes');
const notificacaoRoutes = require('./src/routes/notificacaoRoutes');


// Usa as rotas (prefixe se quiser, ex: /api/use
app.use('/usuarios', userRoutes);
app.use('/reservas', reservaRoutes);
app.use('/sala', salaRoutes);
app.use('/notificacoes', notificacaoRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.render('index'); // Certifique-se de ter views/index.ejs
});

// Middleware para rota não encontrada
app.use((req, res, next) => {
  res.status(404).render('404'); // Crie views/404.ejs se quiser
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
