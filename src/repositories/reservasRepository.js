const db = require('../config/db'); // Conexão com o banco de dados

const reservaRepository = {
  // Criar uma nova reserva
  async create(data) {
    const { id_sala, id_user, titulo, status, horario_inicio, horario_final } = data;

    const query = `
      INSERT INTO reservas (id_sala, id_user, titulo, status, horario_inicio, horario_final)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [id_sala, id_user, titulo, status, horario_inicio, horario_final];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Buscar todas as reservas
  async findAll() {
    const result = await db.query('SELECT * FROM reservas ORDER BY horario_inicio;');
    return result.rows;
  },

  // Buscar reserva por ID
  async findById(id) {
    const result = await db.query('SELECT * FROM reservas WHERE id = $1;', [id]);
    return result.rows[0];
  },

  // Atualizar uma reserva
  async update(id, data) {
    const { id_sala, id_user, titulo, status, horario_inicio, horario_final } = data;

    const query = `
      UPDATE reservas
      SET id_sala = $1, id_user = $2, titulo = $3, status = $4, horario_inicio = $5, horario_final = $6
      WHERE id = $7
      RETURNING *;
    `;

    const values = [id_sala, id_user, titulo, status, horario_inicio, horario_final, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Deletar uma reserva
  async remove(id) {
    await db.query('DELETE FROM reservas WHERE id = $1;', [id]);
  },

  // Buscar reservas por status
  async findByStatus(status) {
    const result = await db.query('SELECT * FROM reservas WHERE status = $1;', [status]);
    return result.rows;
  },

  // Buscar reservas que conflitam no horário para uma sala específica
  async findConflictingReservas(id_sala, horario_inicio, horario_final) {
    // Busca reservas com status pendente ou confirmada que possuem conflito de horário
    const query = `
      SELECT *
      FROM reservas
      WHERE id_sala = $1
        AND status IN ('pendente', 'confirmada')
        AND (
          (horario_inicio, horario_final) OVERLAPS ($2::time, $3::time)
        );
    `;
    const values = [id_sala, horario_inicio, horario_final];
    const result = await db.query(query, values);
    return result.rows;
  },
};

module.exports = reservaRepository;

