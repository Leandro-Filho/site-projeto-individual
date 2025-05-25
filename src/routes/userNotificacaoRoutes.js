const express = require('express');
const router = express.Router();
const controller = require('../controllers/userNotificacaoController');

// Rota para criar um novo relacionamento
router.post('/', controller.create);

// Rota para listar todos os relacionamentos
router.get('/', controller.getAll);

// Rota para buscar por ID
router.get('/:id', controller.getById);

// Rota para buscar notificações de um usuário específico
router.get('/usuario/:userId', controller.getByUserId);

// Rota para atualizar um relacionamento
router.put('/:id', controller.update);

// Rota para deletar um relacionamento
router.delete('/:id', controller.remove);

module.exports = router;
