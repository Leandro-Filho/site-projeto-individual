const db = require('../config/db');

class Reserva {
  // Cria uma nova reserva, se não houver conflito
  static async create(data) {
    // Verifica se a sala já está reservada nesse mesmo horário e data
    const conflito = await db.query(
      `SELECT * FROM reservas 
       WHERE sala_id = $1 AND data = $2 AND status = 'reservado'
       AND (
         (horario_inicio < $4 AND horario_final > $3)
       )`,
      [data.sala_id, data.data, data.horario_inicio, data.horario_final]
    );

    if (conflito.rows.length > 0) {
      throw new Error('Sala já está reservada para este horário');
    }

    const result = await db.query(
      `INSERT INTO reservas 
      (usuario_id, sala_id, titulo, data, status, horario_inicio, horario_final, created_at, update_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        data.usuario_id,
        data.sala_id,
        data.titulo,
        data.data,
        data.status,
        data.horario_inicio,
        data.horario_final,
        data.created_at,
        data.update_at
      ]
    );
    return result.rows[0];
  }

  // Atualiza os dados de uma reserva
  static async update(id, data) {
    const result = await db.query(
      `UPDATE reservas 
      SET titulo = $1, data = $2, status = $3, horario_inicio = $4, horario_final = $5, update_at = $6
      WHERE id = $7
      RETURNING *`,
      [
        data.titulo,
        data.data,
        data.status,
        data.horario_inicio,
        data.horario_final,
        data.update_at,
        id
      ]
    );
    return result.rows[0];
  }

  // Cancela uma reserva (altera o status)
  static async cancel(id) {
    const result = await db.query(
      `UPDATE reservas SET status = 'cancelado', update_at = $1 WHERE id = $2 RETURNING *`,
      [new Date(), id]
    );
    return result.rows[0];
  }

  // Obtém todas as reservas de um usuário (histórico)
  static async getHistoricoByUsuario(usuario_id) {
    const result = await db.query(
      `SELECT * FROM reservas WHERE usuario_id = $1 ORDER BY data DESC, horario_inicio DESC`,
      [usuario_id]
    );
    return result.rows;
  }

  // Atualiza apenas o status de uma reserva
  static async updateStatus(id, status) {
    const result = await db.query(
      `UPDATE reservas SET status = $1, update_at = $2 WHERE id = $3 RETURNING *`,
      [status, new Date(), id]
    );
    return result.rows[0];
  }
}

module.exports = Reserva;
