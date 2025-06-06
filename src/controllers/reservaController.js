const Reserva = require('../models/reservaModel');

const reservaController = {
  // Criar uma nova reserva
  async create(req, res) {
    try {
      const novaReserva = await Reserva.create(req.body);
      res.status(201).json(novaReserva);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Listar todas as reservas
  async getAll(req, res) {
    try {
      const reservas = await Reserva.findAll();
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Buscar reserva por ID
  async getById(req, res) {
    try {
      const reserva = await Reserva.findById(req.params.id);
      if (!reserva) {
        return res.status(404).json({ erro: 'Reserva não encontrada' });
      }
      res.status(200).json(reserva);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Buscar reservas por usuário
  async getByUsuario(req, res) {
    try {
      const reservas = await Reserva.findByUsuario(req.params.id_user);
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Buscar reservas por sala
  async getBySala(req, res) {
    try {
      const reservas = await Reserva.findBySala(req.params.id_sala);
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Atualizar reserva
  async update(req, res) {
    try {
      const reservaAtualizada = await Reserva.update(req.params.id, req.body);
      if (!reservaAtualizada) {
        return res.status(404).json({ erro: 'Reserva não encontrada' });
      }
      res.status(200).json(reservaAtualizada);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Excluir reserva
  async delete(req, res) {
    try {
      await Reserva.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Verificar disponibilidade para nova reserva
  async verificarDisponibilidade(req, res) {
    try {
      const { id_salas, data, horario_inicio, horario_final } = req.query;
      
      if (!id_salas || !data || !horario_inicio || !horario_final) {
        return res.status(400).json({ 
          erro: 'Parâmetros incompletos. Forneça id_salas, data, horario_inicio e horario_final' 
        });
      }
      
      // Usar o método do Sala para verificar disponibilidade
      // Importando o modelo Sala apenas para este método
      const Sala = require('../models/salaModel');
      const disponivel = await Sala.verificarDisponibilidade(
        id_salas, data, horario_inicio, horario_final
      );
      
      res.status(200).json({ disponivel });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};

module.exports = reservaController;