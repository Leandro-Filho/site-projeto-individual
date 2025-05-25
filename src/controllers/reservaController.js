const reservaService = require('../services/reservaService');

const reservaController = {
  // Criar nova reserva
  async create(req, res) {
    try {
      const novaReserva = await reservaService.create(req.body);
      res.status(201).json(novaReserva);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Buscar todas as reservas
  async getAll(req, res) {
    try {
      const reservas = await reservaService.getAll();
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Buscar reserva por ID
  async getById(req, res) {
    try {
      const reserva = await reservaService.getById(req.params.id);
      if (!reserva) {
        return res.status(404).json({ erro: 'Reserva não encontrada' });
      }
      res.status(200).json(reserva);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Atualizar reserva
  async update(req, res) {
    try {
      const reservaAtualizada = await reservaService.update(req.params.id, req.body);
      res.status(200).json(reservaAtualizada);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Deletar reserva
  async remove(req, res) {
    try {
      await reservaService.remove(req.params.id);
      res.status(204).send(); // Sem conteúdo
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Buscar por status
  async getByStatus(req, res) {
    try {
      const reservas = await reservaService.getByStatus(req.params.status);
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },
};

module.exports = reservaController;
