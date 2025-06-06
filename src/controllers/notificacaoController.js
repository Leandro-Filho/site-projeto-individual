const Notificacao = require('../models/notificacaoModel');
const UsuarioNotificacao = require('../models/UsuarioNotificacao');

const notificacaoController = {
  // Criar nova notificação
  async create(req, res) {
    try {
      const novaNotificacao = await Notificacao.create(req.body);
      
      // Se houver destinatários na requisição, associar a notificação a eles
      if (req.body.destinatarios && Array.isArray(req.body.destinatarios)) {
        for (const id_user of req.body.destinatarios) {
          await UsuarioNotificacao.create({
            id_user,
            id_notificacao: novaNotificacao.id
          });
        }
      }
      
      res.status(201).json(novaNotificacao);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Buscar todas as notificações
  async getAll(req, res) {
    try {
      const notificacoes = await Notificacao.findAll();
      res.status(200).json(notificacoes);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Buscar notificação por ID
  async getById(req, res) {
    try {
      const notificacao = await Notificacao.findById(req.params.id);
      if (!notificacao) {
        return res.status(404).json({ erro: 'Notificação não encontrada' });
      }
      res.status(200).json(notificacao);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Atualizar notificação
  async update(req, res) {
    try {
      const notificacaoAtualizada = await Notificacao.update(req.params.id, req.body);
      if (!notificacaoAtualizada) {
        return res.status(404).json({ erro: 'Notificação não encontrada' });
      }
      res.status(200).json(notificacaoAtualizada);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Deletar notificação
  async delete(req, res) {
    try {
      await Notificacao.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Buscar notificações de um usuário
  async getByUsuario(req, res) {
    try {
      const notificacoes = await UsuarioNotificacao.findByUsuario(req.params.id_user);
      res.status(200).json(notificacoes);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Buscar notificações não lidas de um usuário
  async getNaoLidas(req, res) {
    try {
      const notificacoes = await UsuarioNotificacao.findNaoLidas(req.params.id_user);
      res.status(200).json(notificacoes);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Marcar notificação como lida
  async marcarComoLida(req, res) {
    try {
      const { id_user, id_notificacao } = req.params;
      
      const resultado = await UsuarioNotificacao.marcarComoLida(id_user, id_notificacao);
      if (!resultado) {
        return res.status(404).json({ erro: 'Notificação não encontrada para este usuário' });
      }
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};

module.exports = notificacaoController;