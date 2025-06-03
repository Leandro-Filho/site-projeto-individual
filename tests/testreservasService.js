const reservaService = require('../src/services/reservaService');

(async () => {
  try {
    console.log('--- Criando nova reserva ---');
    const novaReserva = await reservaService.create({
      id_sala: 1, // ID de uma sala já existente no banco
      id_user: 1, // ID de um usuário já existente no banco
      titulo: 'Reunião de equipe',
      status: 'pendente',
      horario_inicio: '14:00',
      horario_final: '15:30'
    });
    console.log('✅ Reserva criada:', novaReserva);

    console.log('\n--- Listando todas as reservas ---');
    const todasReservas = await reservaService.getAll();
    console.log(todasReservas);

    console.log('\n--- Buscando reserva por ID ---');
    const reservaPorId = await reservaService.getById(novaReserva.id);
    console.log(reservaPorId);

    console.log('\n--- Atualizando reserva ---');
    const reservaAtualizada = await reservaService.update(novaReserva.id, {
      titulo: 'Reunião atualizada',
      status: 'confirmada',
      horario_inicio: '14:30',
      horario_final: '16:00'
    });
    console.log(reservaAtualizada);

    console.log('\n--- Deletando reserva ---');
    await reservaService.remove(novaReserva.id);
    console.log('✅ Reserva removida com sucesso');
  } catch (error) {
    console.error('❌ Erro nos testes:', error.message);
  }
})();
