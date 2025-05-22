// routes/index.js

const express = require('express');
const router = express.Router();

// Rota principal (GET /)
router.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Você pode adicionar outras rotas aqui, ex:
// router.get('/trilhas', ...)
// router.post('/usuarios', ...)

module.exports = router;

