const reservaRepository = require('../repositories/reservaRepository');

module.exports = {
  async create(reservaData) {
    const { id_sala, horario_inicio, horario_final, status } = reservaData;

    // Validação básica
    if (!id_sala || !horario_inicio || !horario_final || !status) {
      throw new Error('id_sala, horario_inicio, horario_final e status são obrigatórios.');
    }

    // Buscar reservas na mesma sala que conflitem no horário e que estejam ativas (pendente ou confirmada)
    const reservasConflitantes = await reservaRepository.findByRoomAndTimeRange(id_sala, horario_inicio, horario_final);

    // Se existir alguma reserva pendente ou confirmada, bloqueia criação
    const conflitoAtivo = reservasConflitantes.some(r =>
      r.status === 'pendente' || r.status === 'confirmada'
    );

    if (conflitoAtivo) {
      throw new Error('Já existe uma reserva pendente ou confirmada para esta sala no intervalo de horário informado.');
    }

    // Se não há conflito, cria a reserva normalmente
    const novaReserva = await reservaRepository.create(reservaData);
    return novaReserva;
  },

  async getAll(filter = {}) {
    // Pode implementar filtro por horário aqui (opcional)
    return await reservaRepository.getAll(filter);
  },

  async getById(id) {
    if (!id) throw new Error('ID da reserva é obrigatório');
    const reserva = await reservaRepository.getById(id);
    if (!reserva) throw new Error('Reserva não encontrada');
    return reserva;
  },

  async update(id, reservaData) {
    if (!id) throw new Error('ID da reserva é obrigatório');
    const reservaAtualizada = await reservaRepository.update(id, reservaData);
    if (!reservaAtualizada) throw new Error('Reserva não encontrada para atualizar');
    return reservaAtualizada;
  },

  async remove(id) {
    if (!id) throw new Error('ID da reserva é obrigatório');
    await reservaRepository.remove(id);
  },

  // Filtro personalizado para reservas por sala e horário
  async getByRoomAndTimeRange(id_sala, horario_inicio, horario_final) {
    if (!id_sala || !horario_inicio || !horario_final) {
      throw new Error('id_sala, horario_inicio e horario_final são obrigatórios para filtro.');
    }
    return await reservaRepository.findByRoomAndTimeRange(id_sala, horario_inicio, horario_final);
  }
};
