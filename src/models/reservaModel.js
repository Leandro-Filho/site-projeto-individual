const pool = require('../config/db');

class Reserva {
  // Validar dados básicos
  static validate(reserva) {
    if (!reserva.id_user) throw new Error('ID do usuário é obrigatório');
    if (!reserva.id_salas) throw new Error('ID da sala é obrigatório');
    if (!reserva.titulo) throw new Error('Título é obrigatório');
    if (!reserva.data) throw new Error('Data é obrigatória');
    if (!reserva.horario_inicio) throw new Error('Horário de início é obrigatório');
    if (!reserva.horario_final) throw new Error('Horário final é obrigatório');
    
    // Validar formato de horário (HH:MM)
    const regexHorario = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!regexHorario.test(reserva.horario_inicio)) {
      throw new Error('Horário de início deve estar no formato HH:MM');
    }
    if (!regexHorario.test(reserva.horario_final)) {
      throw new Error('Horário final deve estar no formato HH:MM');
    }
    
    // Validar que horário final é maior que inicial
    if (reserva.horario_inicio >= reserva.horario_final) {
      throw new Error('Horário final deve ser maior que o horário inicial');
    }
    
    return reserva;
  }

  // Criar reserva
  static async create(reserva) {
    this.validate(reserva);
    
    const query = `
      INSERT INTO reserva (id_user, id_salas, titulo, data, horario_inicio, horario_final)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const values = [
      reserva.id_user,
      reserva.id_salas,
      reserva.titulo,
      reserva.data,
      reserva.horario_inicio,
      reserva.horario_final
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Buscar todas as reservas
  static async findAll() {
    const query = `
      SELECT r.*, u.email as usuario_email, s.local as sala_local
      FROM reserva r
      JOIN usuario u ON r.id_user = u.id
      JOIN sala s ON r.id_salas = s.id
      ORDER BY r.data DESC, r.horario_inicio
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Buscar reserva por ID
  static async findById(id) {
    const query = `
      SELECT r.*, u.email as usuario_email, s.local as sala_local
      FROM reserva r
      JOIN usuario u ON r.id_user = u.id
      JOIN sala s ON r.id_salas = s.id
      WHERE r.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Buscar reservas por usuário
  static async findByUsuario(usuarioId) {
    const query = `
      SELECT r.*, s.local as sala_local
      FROM reserva r
      JOIN sala s ON r.id_salas = s.id
      WHERE r.id_user = $1
      ORDER BY r.data DESC, r.horario_inicio
    `;
    const result = await pool.query(query, [usuarioId]);
    return result.rows;
  }

  // Buscar reservas por sala
  static async findBySala(salaId) {
    const query = `
      SELECT r.*, u.email as usuario_email
      FROM reserva r
      JOIN usuario u ON r.id_user = u.id
      WHERE r.id_salas = $1
      ORDER BY r.data DESC, r.horario_inicio
    `;
    const result = await pool.query(query, [salaId]);
    return result.rows;
  }

  // Atualizar reserva
  static async update(id, reserva) {
    this.validate(reserva);
    
    const query = `
      UPDATE reserva
      SET id_user = $1, id_salas = $2, titulo = $3, data = $4, 
          horario_inicio = $5, horario_final = $6, update_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `;
    
    const values = [
      reserva.id_user,
      reserva.id_salas,
      reserva.titulo,
      reserva.data,
      reserva.horario_inicio,
      reserva.horario_final,
      id
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Excluir reserva
  static async delete(id) {
    const query = 'DELETE FROM reserva WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = Reserva;