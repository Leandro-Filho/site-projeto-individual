const salaService = require('../services/salaService');

// Controlador para criar uma nova sala
exports.createSala = async (req, res) => {
  try {
    const novaSala = await salaService.createSala(req.body);
    res.status(201).json(novaSala);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Controlador para listar todas as salas
exports.getAllSalas = async (req, res) => {
  try {
    const salas = await salaService.getAllSalas();
    res.status(200).json(salas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Controlador para buscar uma sala por ID
exports.getSalaById = async (req, res) => {
  try {
    const sala = await salaService.getSalaById(req.params.id);
    if (!sala) {
      return res.status(404).json({ erro: 'Sala não encontrada' });
    }
    res.status(200).json(sala);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Controlador para atualizar uma sala
exports.updateSala = async (req, res) => {
  try {
    const salaAtualizada = await salaService.updateSala(req.params.id, req.body);
    res.status(200).json(salaAtualizada);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Controlador para deletar uma sala
exports.deleteSala = async (req, res) => {
  try {
    await salaService.deleteSala(req.params.id);
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Controlador para buscar salas por filtro (ex: ?local=Prédio A)
exports.getSalaByFilter = async (req, res) => {
  try {
    const filtro = req.query; // exemplo: { local: 'Prédio A' }
    const salas = await salaService.getSalaByFilter(filtro);
    res.status(200).json(salas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
