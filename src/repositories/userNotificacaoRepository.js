const db = require('../config/db'); // Importa a conexão com o banco

const userNotificacaoRepository = {
  // Cria um novo registro de notificação para um usuário
  async create(data) {
    const { id_user, id_notificacao, visualizado } = data;

    const query = `
      INSERT INTO user_notificacao (id_user, id_notificacao, visualizado)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [id_user, id_notificacao, visualizado ?? false]; // Se não for informado, assume false
    const result = await db.query(query, values);
    return result.rows[0]; // Retorna o registro criado
  },

  // Lista todos os registros da tabela
  async findAll() {
    const result = await db.query('SELECT * FROM user_notificacao;');
    return result.rows;
  },

  // Busca um registro por ID
  async findById(id) {
    const result = await db.query('SELECT * FROM user_notificacao WHERE id = $1;', [id]);
    return result.rows[0];
  },

  // Atualiza um registro existente
  async update(id, data) {
    const { id_user, id_notificacao, visualizado } = data;

    const query = `
      UPDATE user_notificacao
      SET id_user = $1, id_notificacao = $2, visualizado = $3
      WHERE id = $4
      RETURNING *;
    `;

    const values = [id_user, id_notificacao, visualizado, id];
    const result = await db.query(query, values);
    return result.rows[0]; // Retorna o registro atualizado
  },

  // Deleta um registro por ID
  async remove(id) {
    await db.query('DELETE FROM user_notificacao WHERE id = $1;', [id]);
  },

  // Busca todas as notificações de um usuário específico
  async findByUserId(userId) {
    const result = await db.query('SELECT * FROM user_notificacao WHERE id_user = $1;', [userId]);
    return result.rows;
  }
};

module.exports = userNotificacaoRepository;
