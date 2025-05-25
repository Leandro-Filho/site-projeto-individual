const express = require('express');
const router = express.Router();
const userSalasController = require('../controllers/userSalasController');

// Rotas para gerenciar as associações usuário-sala
router.post('/', userSalasController.create);
router.get('/', userSalasController.findAll);
router.get('/:id', userSalasController.findById);
router.put('/:id', userSalasController.update);
router.delete('/:id', userSalasController.remove);

module.exports = router;
