const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

// Criar uma nova reserva
router.post('/', reservaController.create);

// Listar todas as reservas
router.get('/', reservaController.getAll);

// Buscar uma reserva por ID
router.get('/:id', reservaController.getById);

// Atualizar uma reserva
router.put('/:id', reservaController.update);

// Deletar uma reserva
router.delete('/:id', reservaController.delete);

// Buscar reservas por usuário
router.get('/usuario/:id_user', reservaController.getByUsuario);

// Buscar reservas por sala
router.get('/sala/:id_sala', reservaController.getBySala);

module.exports = router;