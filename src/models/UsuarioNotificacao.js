const pool = require('../config/db');

class UsuarioNotificacao {
  // Validar dados básicos
  static validate(usuarioNotificacao) {
    if (!usuarioNotificacao.id_user) throw new Error('ID do usuário é obrigatório');
    if (!usuarioNotificacao.id_notificacao) throw new Error('ID da notificação é obrigatório');
    return usuarioNotificacao;
  }

  // Associar uma notificação a um usuário
  static async create(usuarioNotificacao) {
    this.validate(usuarioNotificacao);
    
    const query = `
      INSERT INTO usuario_notificacao (id_user, id_notificacao)
      VALUES ($1, $2)
      RETURNING *
    `;
    
    const values = [
      usuarioNotificacao.id_user,
      usuarioNotificacao.id_notificacao
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Marcar notificação como lida
  static async marcarComoLida(id_user, id_notificacao) {
    const query = `
      UPDATE usuario_notificacao
      SET lido = TRUE
      WHERE id_user = $1 AND id_notificacao = $2
      RETURNING *
    `;
    
    const result = await pool.query(query, [id_user, id_notificacao]);
    return result.rows[0];
  }

  // Buscar todas as notificações de um usuário
  static async findByUsuario(usuarioId) {
    const query = `
      SELECT n.*, un.lido, un.recebido_em
      FROM notificacao n
      JOIN usuario_notificacao un ON n.id = un.id_notificacao
      WHERE un.id_user = $1
      ORDER BY n.created_at DESC
    `;
    
    const result = await pool.query(query, [usuarioId]);
    return result.rows;
  }

  // Buscar notificações não lidas de um usuário
  static async findNaoLidas(usuarioId) {
    const query = `
      SELECT n.*, un.recebido_em
      FROM notificacao n
      JOIN usuario_notificacao un ON n.id = un.id_notificacao
      WHERE un.id_user = $1 AND un.lido = FALSE
      ORDER BY n.created_at DESC
    `;
    
    const result = await pool.query(query, [usuarioId]);
    return result.rows;
  }

  // Buscar todos os usuários que receberam uma notificação
  static async findUsuariosByNotificacao(notificacaoId) {
    const query = `
      SELECT u.*, un.lido, un.recebido_em
      FROM usuario u
      JOIN usuario_notificacao un ON u.id = un.id_user
      WHERE un.id_notificacao = $1
      ORDER BY u.email
    `;
    
    const result = await pool.query(query, [notificacaoId]);
    return result.rows;
  }

  // Remover associação entre usuário e notificação
  static async delete(id_user, id_notificacao) {
    const query = `
      DELETE FROM usuario_notificacao 
      WHERE id_user = $1 AND id_notificacao = $2
    `;
    
    await pool.query(query, [id_user, id_notificacao]);
  }
}

module.exports = UsuarioNotificacao;