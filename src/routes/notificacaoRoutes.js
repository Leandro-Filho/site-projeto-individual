const express = require('express');
const router = express.Router();
const notificacaoController = require('../controllers/notificacaoController');

router.post('/notificacoes', notificacaoController.create);
router.get('/notificacoes', notificacaoController.getAll);
router.get('/notificacoes/:id', notificacaoController.getById);
router.put('/notificacoes/:id', notificacaoController.update);
router.delete('/notificacoes/:id', notificacaoController.remove);

module.exports = router;
