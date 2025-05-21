const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Criar notificação
router.post('/', notificationController.createNotification);

// Deletar notificação por ID e usuário
router.delete('/:notificationId/user/:userId', notificationController.deleteNotification);

module.exports = router;
