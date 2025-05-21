const reservaService = require('../services/reservaService');

// Cria uma nova reserva
const criarReserva = async (req, res) => {
  try {
    const { usuario_id, sala_id, titulo, data, horario_inicio, horario_final } = req.body;

    const novaReserva = await reservaService.criarReserva({
      usuario_id,
      sala_id,
      titulo,
      data,
      status: 'reservado',
      horario_inicio,
      horario_final,
      created_at: new Date(),
      update_at: new Date()
    });

    res.status(201).json(novaReserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cancela uma reserva
const cancelarReserva = async (req, res) => {
  try {
    const reservaCancelada = await reservaService.cancelarReserva(req.params.id);

    if (reservaCancelada) {
      res.status(200).json(reservaCancelada);
    } else {
      res.status(404).json({ error: 'Reserva não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualiza uma reserva existente
const atualizarReserva = async (req, res) => {
  try {
    const { titulo, data, status, horario_inicio, horario_final } = req.body;

    const reservaAtualizada = await reservaService.atualizarReserva(req.params.id, {
      titulo,
      data,
      status,
      horario_inicio,
      horario_final,
      update_at: new Date()
    });

    if (reservaAtualizada) {
      res.status(200).json(reservaAtualizada);
    } else {
      res.status(404).json({ error: 'Reserva não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Histórico de reservas por usuário
const historicoReservasUsuario = async (req, res) => {
  try {
    const reservas = await reservaService.historicoPorUsuario(req.params.usuario_id);
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualiza apenas o status de uma reserva
const atualizarStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reserva = await reservaService.atualizarStatus(req.params.id, status);

    if (reserva) {
      res.status(200).json(reserva);
    } else {
      res.status(404).json({ error: 'Reserva não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  criarReserva,
  cancelarReserva,
  atualizarReserva,
  historicoReservasUsuario,
  atualizarStatus
};
