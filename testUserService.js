const userService = require('./src/services/userService'); // ajuste o caminho conforme sua estrutura

async function testarService() {
  try {
    console.log('--- Criando usuário ---');
    const novo = await userService.createUser({
      nome: 'Usuário Teste',
      email: 'teste@example.com',
      senha: '12345678d',
      empresa_escola: 'Escola Exemplo',
      celular: '11999999999'
    });
    console.log('✅ Usuário criado:', novo);

    console.log('\n--- Listando todos os usuários ---');
    const todos = await userService.listAllUsers();
    console.log(todos);

    console.log('\n--- Buscando por ID ---');
    const encontrado = await userService.getUserById(novo.id);
    console.log(encontrado);

    console.log('\n--- Atualizando usuário ---');
    const atualizado = await userService.updateUser(novo.id, {
      nome: 'Usuário Atualizado',
      email: 'teste@example.com',
      empresa_escola: 'Nova Escola',
      celular: '11888888888'
    });
    console.log(atualizado);

    console.log('\n--- Buscando perfil completo ---');
    const perfil = await userService.getPerfilCompleto(novo.id);
    console.log(perfil);

    console.log('\n--- Deletando usuário ---');
    await userService.deleteUser(novo.id);
    console.log('✅ Usuário deletado');

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
}

testarService();
