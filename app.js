
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const usuarioRoutes = require('./src/routes/userRoutes');
const salaRoutes = require('./src/routes/salaRoutes');
const reservaRoutes = require('./src/routes/reservasRoutes');
const notificacaoRoutes = require('./src/routes/notificacaoRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // para processar formulários POST via urlencoded
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usuarioRoutes);
app.post('/create', (req, res) => {
  console.log('Chegou POST /create no app.js');
  res.send('Recebido');
});


app.use('/api/salas', salaRoutes);    

app.use('/api/reservas', reservaRoutes);

app.use('/api/notificacao', notificacaoRoutes);

app.get('/', (req, res) => {
  res.render('user/create', { erro: null, sucesso: false });
});


module.exports = app;

