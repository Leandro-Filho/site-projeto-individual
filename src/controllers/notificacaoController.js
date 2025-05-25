const notificacaoService = require('../services/notificacaoService');

const notificacaoController = {
  async create(req, res) {
    try {
      const novaNotificacao = await notificacaoService.create(req.body);
      res.status(201).json(novaNotificacao);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const notificacoes = await notificacaoService.getAll();
      res.json(notificacoes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const noti = await notificacaoService.getById(req.params.id);
      res.json(noti);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await notificacaoService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await notificacaoService.remove(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = notificacaoController;
