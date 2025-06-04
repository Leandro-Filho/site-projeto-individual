const userRepository = require('../repositories/userRepository');
const schema = require('../models/userModel');

async function createUser(userData) {
  // validação com Joi ou outra lógica
  return userRepository.create(userData); // <-- isso é o que salva no banco
};

async function getUserById(id) {
  const user = await userRepository.getById(id);
  if (!user) {
    throw new Error('Usuário não encontrado.');
  }
  return user;
}

async function listAllUsers() {
  return await userRepository.getAll();
}

async function updateUser(id, userData) {
  const existing = await userRepository.getById(id);
  if (!existing) {
    throw new Error('Usuário não encontrado para atualização.');
  }
  return await userRepository.update(id, userData);
}

async function updateSenha(id, novaSenha) {
  return await userRepository.updateSenha(id, novaSenha);
}

async function deleteUser(id) {
  const existing = await userRepository.getById(id);
  if (!existing) {
    throw new Error('Usuário não encontrado para exclusão.');
  }
  await userRepository.delete(id);
}

async function getPerfilCompleto(id) {
  const perfil = await userRepository.getPerfil(id);
  if (!perfil) {
    throw new Error('Perfil não encontrado.');
  }
  return perfil;
}

module.exports = {
  createUser,
  getAllUsers: listAllUsers,
  getUserById,
  updateUser,
  updateUserPassword: updateSenha,
  deleteUser,
  getPerfil: getPerfilCompleto,
};

