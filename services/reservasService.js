const Reserva = require('../models/reserva');

// Cria nova reserva se não houver conflito
const criarReserva = async (data) => {
  return await Reserva.create(data);
};

// Cancela uma reserva
const cancelarReserva = async (id) => {
  return await Reserva.cancel(id);
};

// Atualiza os dados da reserva
const atualizarReserva = async (id, data) => {
  return await Reserva.update(id, data);
};

// Retorna o histórico de reservas de um usuário
const historicoPorUsuario = async (usuario_id) => {
  return await Reserva.getHistoricoByUsuario(usuario_id);
};

// Atualiza status da reserva
const atualizarStatus = async (id, status) => {
  return await Reserva.updateStatus(id, status);
};

module.exports = {
  criarReserva,
  cancelarReserva,
  atualizarReserva,
  historicoPorUsuario,
  atualizarStatus
};
