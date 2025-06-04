// userController.js

const userService = require('../services/userService');

module.exports = {

  // Criar um usuário novo
  async createUser(req, res) {
   console.log('POST /create chegou:', req.body);

    try {
      await userService.createUser(req.body);
      res.redirect('/create?success=1');
    } catch (error) {
      res.status(400).render('user/create', {
        sucesso: false,
        erro: error.message
      });
    }
  },

  // Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAll();
      res.json(users); // 200 OK por padrão
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Buscar usuário por ID
  async getUserById(req, res) {
    try {
      const id = req.params.id; // pegar o id da URL /users/:id
      const user = await userService.getById(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Atualizar usuário
  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const userData = req.body;
      const updatedUser = await userService.update(id, userData);
      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado para atualizar' });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(400).json({ error: error.message });
    }
  },

  // Atualizar senha do usuário
  async updateUserPassword(req, res) {
    try {
      const id = req.params.id;
      const { novaSenha } = req.body;
      if (!novaSenha) {
        return res.status(400).json({ error: 'Nova senha não informada' });
      }
      const updatedUser = await userService.updateSenha(id, novaSenha);
      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado para atualizar senha' });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar usuário
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await userService.delete(id);
      res.status(204).send(); // 204 No Content, sucesso sem retorno de dados
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Buscar perfil completo (com reservas e notificações)
  async getPerfil(req, res) {
    try {
      const id = req.params.id;
      const perfil = await userService.getPerfil(id);
      if (!perfil) {
        return res.status(404).json({ error: 'Perfil não encontrado' });
      }
      res.json(perfil);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Exibir formulário de criação de usuário (EJS)
 async showCreateForm(req, res) {
  const sucesso = req.query.success === '1';
  res.render('user/create', {
    sucesso,
    erro: null // ← isso evita o erro no EJS!
  });
}


};
