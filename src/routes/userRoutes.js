const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rotas para usuários
router.post('/', usuarioController.create);                    // Criar usuário
router.get('/', usuarioController.getAll);                     // Listar todos os usuários
router.get('/:id', usuarioController.getById);                 // Buscar usuário por ID
router.put('/:id', usuarioController.update);                  // Atualizar usuário
router.patch('/:id/password', usuarioController.updatePassword); // Atualizar senha
router.delete('/:id', usuarioController.delete);               // Deletar usuário
router.get('/:id/perfil', usuarioController.getPerfil);        // Perfil completo

module.exports = router;