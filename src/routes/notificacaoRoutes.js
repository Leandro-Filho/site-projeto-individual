const express = require('express');
const router = express.Router();
const notificacaoController = require('../controllers/notificacaoController');

// Criar nova notificação
router.post('/', notificacaoController.create);

// Buscar todas as notificações
router.get('/', notificacaoController.getAll);

// Buscar notificação por ID
router.get('/:id', notificacaoController.getById);

// Atualizar notificação
router.put('/:id', notificacaoController.update);

// Deletar notificação
router.delete('/:id', notificacaoController.delete);


// Buscar notificações de um usuário
router.get('/usuario/:id_user', notificacaoController.getByUsuario);

// Buscar notificações não lidas de um usuário
router.get('/usuario/:id_user/nao-lidas', notificacaoController.getNaoLidas);

// Marcar notificação como lida
router.patch('/usuario/:id_user/notificacao/:id_notificacao', notificacaoController.marcarComoLida);

module.exports = router;
