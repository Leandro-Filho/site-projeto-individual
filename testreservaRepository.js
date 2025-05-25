const reservaRepository = require('./src/repositories/reservasRepository');

(async () => {
  try {
    console.log('\n--- Criando nova reserva ---');
    const novaReserva = await reservaRepository.create({
      id_sala: 1,        // Altere conforme o ID real existente no banco
      id_user: 1,        // Altere conforme o ID real existente no banco
      titulo: 'Aula de Matemática',
      status: 'pendente',
      horario_inicio: '09:00',
      horario_final: '10:00',
    });

    console.log('✅ Reserva criada:', novaReserva);

    console.log('\n--- Listando todas as reservas ---');
    const reservas = await reservaRepository.findAll();
    console.log(reservas);

    console.log('\n--- Buscando reserva por ID ---');
    const reservaPorId = await reservaRepository.findById(novaReserva.id);
    console.log(reservaPorId);

    console.log('\n--- Atualizando reserva ---');
    const reservaAtualizada = await reservaRepository.update(novaReserva.id, {
      id_sala: 1,
      id_user: 1,
      titulo: 'Aula de Física',
      status: 'confirmada',
      horario_inicio: '09:00',
      horario_final: '10:30',
    });
    console.log(reservaAtualizada);

    console.log('\n--- Filtrando reservas por status ---');
    const reservasConfirmadas = await reservaRepository.findByStatus('confirmada');
    console.log(reservasConfirmadas);

    console.log('\n--- Deletando reserva ---');
    await reservaRepository.remove(novaReserva.id);
    console.log('❌ Reserva deletada com sucesso.');

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
})();
