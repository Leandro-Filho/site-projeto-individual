const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController');

// Criar sala
router.post('/', salaController.createSala);

// Atualizar sala
router.put('/:id', salaController.updateSala);

// Deletar sala
router.delete('/:id', salaController.deleteSala);

module.exports = router;