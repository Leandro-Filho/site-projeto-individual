// testUserRepository.js

require('dotenv').config();
const userRepository = require('./src/repositories/userRepository');

// Função de teste principal
async function test() {
  try {
    console.log('--- Criando novo usuário ---');
    const novoUsuario = {
      nome: 'Teste User',
      email: 'teste@example.com',
      senha: '1234569uuuuuu',
      empresa_escola: 'Escola Teste',
      celular: '12345678990'
    };

    const userCriado = await userRepository.create(novoUsuario);
    console.log('Usuário criado:', userCriado);

    console.log('--- Listando todos os usuários ---');
    const usuarios = await userRepository.getAll();
    console.log(usuarios);

    console.log('--- Buscando usuário por ID ---');
    const usuarioBuscado = await userRepository.getById(userCriado.id);
    console.log(usuarioBuscado);

    console.log('--- Atualizando usuário ---');
    const atualizado = await userRepository.update(userCriado.id, {
      nome: 'Usuário Atualizado',
      email: 'atualizado@example.com',
      senha: 'novaSenha',
      empresa_escola: 'Nova Escola',
      celular: '987654321'
    });
    console.log('Usuário atualizado:', atualizado);

    console.log('--- Deletando usuário ---');
    await userRepository.delete(userCriado.id);
    console.log('Usuário deletado com sucesso.');
  } catch (error) {
    console.error('Erro durante o teste:', error.message);
  }
}

test();

