const salaRepository = require('../src/repositories/salaRepository');

async function testSalaRepository() {
  try {
    // Criar uma nova sala
    console.log('--- Criando nova sala ---');
    const novaSala = await salaRepository.create({
      local: 'Prédio A',
      descricao: 'Sala de reuniões principal',
      capacidade: 30,
    });
    console.log('Sala criada:', novaSala);

    // Buscar todas as salas
    console.log('\n--- Listando todas as salas ---');
    const todasSalas = await salaRepository.getAll();
    console.log(todasSalas);

    // Buscar sala por ID
    console.log('\n--- Buscando sala por ID ---');
    const salaPorId = await salaRepository.getById(novaSala.id);
    console.log(salaPorId);

    // Atualizar sala
    console.log('\n--- Atualizando sala ---');
    const salaAtualizada = await salaRepository.update(novaSala.id, {
      local: 'Prédio B',
      descricao: 'Sala atualizada para reuniões',
      capacidade: 40,
    });
    console.log(salaAtualizada);

    // Filtrar salas por local
    console.log('\n--- Buscando salas com filtro local "Prédio B" ---');
    const salasFiltradas = await salaRepository.getByFilter({ local: 'Prédio B' });
    console.log(salasFiltradas);

    // Deletar sala
    console.log('\n--- Deletando sala ---');
    await salaRepository.remove(novaSala.id);
    console.log('Sala deletada.');

  } catch (err) {
    console.error('Erro durante o teste:', err.message);
  } finally {
    // Finalizar o pool de conexões para sair do processo
    const pool = require('../src/config/db');
    await pool.end();
  }
}

testSalaRepository();
