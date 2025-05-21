const db = require('../config/db');

class Notificacao {
  // Cria uma nova notificação relacionada a um usuário
  static async create(data) {
    const result = await db.query(
      `
      INSERT INTO notificacoes (usuario_id, titulo, mensagem, created_at, update_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        data.usuario_id,
        data.titulo,
        data.mensagem,
        data.created_at,
        data.update_at
      ]
    );
    return result.rows[0];
  }

  // Deleta uma notificação específica de um usuário específico
  static async deleteByUser(notificationId, userId) {
    const result = await db.query(
      'DELETE FROM notificacoes WHERE id = $1 AND usuario_id = $2 RETURNING *',
      [notificationId, userId]
    );
    return result.rowCount > 0; // true se algo foi deletado
  }
}

module.exports = Notificacao;