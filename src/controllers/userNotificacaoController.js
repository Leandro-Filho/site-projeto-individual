const userNotificacaoService = require('../services/userNotificacaoService');

module.exports = {
  // Cria um novo relacionamento
  async create(req, res) {
    try {
      const created = await userNotificacaoService.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Lista todos os relacionamentos
  async getAll(req, res) {
    try {
      const records = await userNotificacaoService.getAll();
      res.json(records);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Busca um único relacionamento por ID
  async getById(req, res) {
    try {
      const record = await userNotificacaoService.getById(req.params.id);
      res.json(record);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  // Atualiza um relacionamento
  async update(req, res) {
    try {
      const updated = await userNotificacaoService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Remove um relacionamento
  async remove(req, res) {
    try {
      await userNotificacaoService.remove(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lista notificações de um usuário
  async getByUserId(req, res) {
    try {
      const notifications = await userNotificacaoService.getByUserId(req.params.userId);
      res.json(notifications);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
