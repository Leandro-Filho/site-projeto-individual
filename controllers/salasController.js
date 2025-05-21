const salaService = require('../services/salaService');

// Controlador para criar uma nova sala
const createSala = async (req, res) => {
  try {
    const { local, descricao, capacidade } = req.body;

    const created_at = new Date();
    const update_at = new Date();

    const novaSala = await salaService.createSala({
      local,
      descricao,
      capacidade,
      created_at,
      update_at
    });

    res.status(201).json(novaSala);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para atualizar uma sala específica
const updateSala = async (req, res) => {
  try {
    const { local, descricao, capacidade } = req.body;
    const update_at = new Date();

    const salaAtualizada = await salaService.updateSala(req.params.id, {
      local,
      descricao,
      capacidade,
      update_at
    });

    if (salaAtualizada) {
      res.status(200).json(salaAtualizada);
    } else {
      res.status(404).json({ error: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para deletar uma sala
const deleteSala = async (req, res) => {
  try {
    const deleted = await salaService.deleteSala(req.params.id);

    if (deleted) {
      res.status(200).json({ message: 'Sala deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSala,
  updateSala,
  deleteSala
};
