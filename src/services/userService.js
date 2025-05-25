const userRepository = require('../repositories/userRepository'); // Importa o repositório de usuários (acesso ao banco)
const schema = require('../models/userModel'); // Importa o schema de validação Joi

// Função para criar um novo usuário
async function createUser(userData) {
  // Valida os dados usando o schema Joi
  const validatedUser = schema.validate(userData);
  if (validatedUser.error) {
    // Se houver erro na validação, lança uma exceção com a mensagem
    throw new Error(validatedUser.error.details[0].message);
  }

  // Verifica se o e-mail já está cadastrado
  const existingUsers = await userRepository.getByFilter({ email: userData.email });
  if (existingUsers.length > 0) {
    throw new Error('E-mail já cadastrado.');
  }

  // Se tudo estiver certo, chama o repositório para criar o usuário
  return await userRepository.create(userData);
}

// Função para buscar um usuário pelo ID
async function getUserById(id) {
  const user = await userRepository.getById(id);
  if (!user) {
    throw new Error('Usuário não encontrado.');
  }
  return user;
}

// Função para listar todos os usuários
async function listAllUsers() {
  return await userRepository.getAll();
}

// Função para atualizar os dados de um usuário
async function updateUser(id, userData) {
  // Verifica se o usuário existe antes de atualizar
  const existing = await userRepository.getById(id);
  if (!existing) {
    throw new Error('Usuário não encontrado para atualização.');
  }

  // Atualiza os dados no banco
  return await userRepository.update(id, userData);
}

// Função para atualizar a senha de um usuário
async function updateSenha(id, novaSenha) {
  // Chama diretamente o método de atualizar senha no repositório
  return await userRepository.updateSenha(id, novaSenha);
}

// Função para deletar um usuário
async function deleteUser(id) {
  // Verifica se o usuário existe
  const existing = await userRepository.getById(id);
  if (!existing) {
    throw new Error('Usuário não encontrado para exclusão.');
  }

  // Chama o repositório para deletar o usuário
  await userRepository.delete(id);
}

// Função para obter o perfil completo de um usuário (com reservas e notificações)
async function getPerfilCompleto(id) {
  const perfil = await userRepository.getPerfil(id);
  if (!perfil) {
    throw new Error('Perfil não encontrado.');
  }
  return perfil;
}

// Exporta todas as funções para que possam ser usadas em controllers
module.exports = {
  createUser,
  getUserById,
  listAllUsers,
  updateUser,
  updateSenha,
  deleteUser,
  getPerfilCompleto
};
