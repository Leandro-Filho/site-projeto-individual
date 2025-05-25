const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController');

// Rota para criar uma nova sala
router.post('/sala', salaController.createSala);

// Rota para listar todas as salas
router.get('/sala', salaController.getAllSalas);

// Rota para buscar uma sala por ID
router.get('/sala/:id', salaController.getSalaById);

// Rota para atualizar uma sala
router.put('/sala/:id', salaController.updateSala);

// Rota para deletar uma sala
router.delete('/sala/:id', salaController.deleteSala);

// Rota para buscar salas por filtro (ex: ?local=Prédio A)
router.get('/sala-filtro', salaController.getSalaByFilter);

module.exports = router;
