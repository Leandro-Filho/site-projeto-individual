const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/create', userController.showCreateForm);   // Tela formulário criação usuário
router.post('/create', userController.createUser);             // Criar usuário (API ou formulário)
router.get('/', userController.getAllUsers);             // Listar todos
router.get('/:id', userController.getUserById);          // Buscar por id
router.put('/:id', userController.updateUser);           // Atualizar usuário
router.patch('/:id/password', userController.updateUserPassword); // Atualizar senha
router.delete('/:id', userController.deleteUser);        // Deletar usuário
router.get('/:id/perfil', userController.getPerfil);     // Perfil completo

module.exports = router;
