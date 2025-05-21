// Importa o serviço de usuário que lida com as regras de negócio
const userService = require('../services/userService');

// Controlador para buscar todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    // Retorna erro interno do servidor
    res.status(500).json({ error: error.message });
  }
};

// Controlador para buscar um usuário pelo ID
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      // Retorna erro se o usuário não for encontrado
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para criar um novo usuário
const createUser = async (req, res) => {
  try {
    const { senha, email, empresa, numero_celular } = req.body;

    // Dados adicionais como data de criação e atualização
    const create_at = new Date();
    const update_at = new Date();

    const newUser = await userService.createUser({
      senha,
      email,
      empresa,
      numero_celular,
      create_at,
      update_at
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para atualizar um usuário existente
const updateUser = async (req, res) => {
  try {
    const { senha, email, empresa, numero_celular } = req.body;
    const update_at = new Date(); // Atualiza a data de modificação

    const updatedUser = await userService.updateUser(req.params.id, {
      senha,
      email,
      empresa,
      numero_celular,
      update_at
    });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para deletar um usuário
const deleteUser = async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (deleted) {
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exporta todas as funções para serem usadas nas rotas
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
