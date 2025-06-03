const salaService = require('../src/services/salaService');

async function testSalaService() {
  try {
    console.log('--- Criando sala ---');
    const sala = await salaService.create({
      local: 'Prédio C',
      descricao: 'Sala para treinamento',
      capacidade: 25,
    });
    console.log(sala);

    console.log('--- Listando todas as salas ---');
    console.log(await salaService.getAll());

    console.log('--- Buscando sala por ID ---');
    console.log(await salaService.getById(sala.id));

    console.log('--- Atualizando sala ---');
    const atualizada = await salaService.update(sala.id, {
      local: 'Prédio D',
      descricao: 'Sala atualizada',
      capacidade: 30,
    });
    console.log(atualizada);

    console.log('--- Buscando por filtro ---');
    console.log(await salaService.getByFilter({ local: 'Prédio D' }));

    console.log('--- Deletando sala ---');
    await salaService.remove(sala.id);
    console.log('Sala removida');

  } catch (error) {
    console.error('Erro:', error.message);
  }
}

testSalaService();
