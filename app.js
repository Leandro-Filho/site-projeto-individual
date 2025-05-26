
const express = require('express');
const cors = require('cors');
const path = require('path');
const usuarioRoutes = require('./src/routes/userRoutes');
const salaRoutes = require('./src/routes/salaRoutes');
const reservaRoutes = require('./src/routes/reservasRoutes');
const notificacaoRoutes = require('./src/routes/notificacaoRoutes');
const usernotificacaoRoutes = require('./src/routes/userNotificacaoRoutes');
const usersalasRoutes = require('./src/routes/userSalasRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', usuarioRoutes);

app.use('/api/salas', salaRoutes);

app.use('/api/reservas', reservaRoutes);

app.use('/api/notificacao', notificacaoRoutes);

app.use('/api/usernotificacao', usernotificacaoRoutes);

app.use('/api/usersalas', usersalasRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'user.html')); // ou index.html
});


module.exports = app;

