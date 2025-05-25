const userSalasService = require('../services/userSalasService');

const userSalasController = {
  // Criar associação
  async create(req, res) {
    try {
      const result = await userSalasService.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Buscar todas as associações
  async findAll(req, res) {
    try {
      const results = await userSalasService.findAll();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Buscar associação por ID
  async findById(req, res) {
    try {
      const result = await userSalasService.findById(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  // Atualizar associação
  async update(req, res) {
    try {
      const result = await userSalasService.update(req.params.id, req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Deletar associação
  async remove(req, res) {
    try {
      await userSalasService.remove(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = userSalasController;
