const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController');

// Rotas para salas
router.post('/', salaController.create);                      // Criar sala
router.get('/', salaController.getAll);                       // Listar todas as salas
router.get('/filtro', salaController.getByFilter);            // Buscar salas por filtro
router.get('/disponibilidade', salaController.verificarDisponibilidade); // Verificar disponibilidade
router.get('/:id', salaController.getById);                   // Buscar sala por ID
router.put('/:id', salaController.update);                    // Atualizar sala
router.delete('/:id', salaController.delete);                 // Deletar sala

// Rotas para associação usuário-sala
router.post('/associar', salaController.associarUsuario);     // Associar usuário a sala
router.delete('/:id_salas/usuario/:id_user', salaController.desassociarUsuario); // Remover associação
router.get('/:id/usuarios', salaController.getUsuarios);      // Listar usuários de uma sala

module.exports = router;
