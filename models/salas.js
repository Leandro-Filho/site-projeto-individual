const db = require('../config/db');

class Sala {
  // Cria uma nova sala
  static async create(data) {
    const result = await db.query(
      `
      INSERT INTO salas (local, descricao, capacidade, created_at, update_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        data.local,
        data.descricao,
        data.capacidade,
        data.created_at,
        data.update_at
      ]
    );
    return result.rows[0];
  }

  // Atualiza os dados de uma sala específica
  static async update(id, data) {
    const result = await db.query(
      `
      UPDATE salas 
      SET local = $1, descricao = $2, capacidade = $3, update_at = $4
      WHERE id = $5
      RETURNING *
      `,
      [
        data.local,
        data.descricao,
        data.capacidade,
        data.update_at,
        id
      ]
    );
    return result.rows[0];
  }

  // Deleta uma sala específica pelo ID
  static async delete(id) {
    const result = await db.query(
      'DELETE FROM salas WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rowCount > 0; // true se deletou
  }
}

module.exports = Sala;
