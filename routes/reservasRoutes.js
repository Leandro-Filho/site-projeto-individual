const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/', reservaController.criarReserva); // Criar reserva
router.put('/:id', reservaController.atualizarReserva); // Editar reserva
router.put('/:id/status', reservaController.atualizarStatus); // Alterar status
router.delete('/:id', reservaController.cancelarReserva); // Cancelar reserva
router.get('/usuario/:usuario_id', reservaController.historicoReservasUsuario); // Histórico do usuário

module.exports = router;
