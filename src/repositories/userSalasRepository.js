const db = require('../config/db');

const userSalasRepository = {
  // Cria uma nova associação entre usuário e sala
  async create(data) {
    const { id_user, id_sala } = data;
    const query = `
      INSERT INTO user_salas (id_user, id_sala)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await db.query(query, [id_user, id_sala]);
    return result.rows[0];
  },

  // Retorna todas as associações
  async findAll() {
    const result = await db.query('SELECT * FROM user_salas;');
    return result.rows;
  },

  // Retorna uma associação por ID
  async findById(id) {
    const result = await db.query('SELECT * FROM user_salas WHERE id = $1;', [id]);
    return result.rows[0];
  },

  // Atualiza uma associação
  async update(id, data) {
    const { id_user, id_sala } = data;
    const query = `
      UPDATE user_salas
      SET id_user = $1, id_sala = $2
      WHERE id = $3
      RETURNING *;
    `;
    const result = await db.query(query, [id_user, id_sala, id]);
    return result.rows[0];
  },

  // Remove uma associação por ID
  async remove(id) {
    await db.query('DELETE FROM user_salas WHERE id = $1;', [id]);
  }
};

module.exports = userSalasRepository;
