const Usuario = require('../models/usuarioModel');
const UsuarioSala = require('../models/usuarioSala');
const UsuarioNotificacao = require('../models/UsuarioNotificacao');

const usuarioController = {
  // Criar um novo usuário
 async create(req, res) {
  try {
    const novoUsuario = await Usuario.create(req.body);
    // Redireciona para a rota que renderiza as salas
    res.redirect('/salas/visualizar');
  } catch (error) {
    // Pode manter o json para erros
    res.status(400).json({ erro: error.message });
  }
},

  // Buscar todos os usuários
  async getAll(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Buscar usuário por ID
  async getById(req, res) {
    try {
      const usuario = await Usuario.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Atualizar usuário
  async update(req, res) {
    try {
      const usuarioAtualizado = await Usuario.update(req.params.id, req.body);
      if (!usuarioAtualizado) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Atualizar senha do usuário
  async updatePassword(req, res) {
    try {
      if (!req.body.senha) {
        return res.status(400).json({ erro: 'Senha é obrigatória' });
      }
      
      const usuarioAtualizado = await Usuario.updatePassword(req.params.id, req.body.senha);
      if (!usuarioAtualizado) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      res.status(200).json({ mensagem: 'Senha atualizada com sucesso' });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Deletar usuário
  async delete(req, res) {
    try {
      await Usuario.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Buscar perfil completo (com salas e notificações)
  async getPerfil(req, res) {
    try {
      const id = req.params.id;
      
      // Buscar dados do usuário
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      
      // Buscar salas associadas ao usuário
      const salas = await UsuarioSala.findSalasByUsuario(id);
      
      // Buscar notificações do usuário
      const notificacoes = await UsuarioNotificacao.findByUsuario(id);
      
      // Montar objeto de perfil
      const perfil = {
        usuario,
        salas,
        notificacoes
      };
      
      res.status(200).json(perfil);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};

module.exports = usuarioController;

