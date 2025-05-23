
const express = require('express');
const cors = require('cors');
const path = require('path');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

module.exports = app;
