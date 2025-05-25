const db = require('../config/db');

const notificacaoRepository = {
  async create(data) {
    const { titulo, mensagem } = data;
    const result = await db.query(
      'INSERT INTO notificacoes (titulo, mensagem) VALUES ($1, $2) RETURNING *;',
      [titulo, mensagem]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await db.query('SELECT * FROM notificacoes ORDER BY id DESC;');
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM notificacoes WHERE id = $1;', [id]);
    return result.rows[0];
  },

  async update(id, data) {
    const { titulo, mensagem } = data;
    const result = await db.query(
      'UPDATE notificacoes SET titulo = $1, mensagem = $2 WHERE id = $3 RETURNING *;',
      [titulo, mensagem, id]
    );
    return result.rows[0];
  },

  async remove(id) {
    await db.query('DELETE FROM notificacoes WHERE id = $1;', [id]);
  }
};

module.exports = notificacaoRepository;
