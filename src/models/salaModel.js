const pool = require('../config/db');

class Sala {
  // Validar dados básicos
  static validate(sala) {
    if (!sala.local) throw new Error('Local é obrigatório');
    if (!sala.capacidade) throw new Error('Capacidade é obrigatória');
    if (isNaN(sala.capacidade) || sala.capacidade <= 0) {
      throw new Error('Capacidade deve ser um número positivo');
    }
    return sala;
  }

  // Criar sala
  static async create(sala) {
    this.validate(sala);
    
    const query = `
      INSERT INTO sala (local, descricao, capacidade)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const values = [
      sala.local,
      sala.descricao || null,
      sala.capacidade
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Buscar todas as salas
  static async findAll() {
    const query = 'SELECT * FROM sala ORDER BY local';
    const result = await pool.query(query);
    return result.rows;
  }

  // Buscar sala por ID
  static async findById(id) {
    const query = 'SELECT * FROM sala WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Buscar salas por capacidade mínima
  static async findByCapacidade(capacidadeMinima) {
    const query = 'SELECT * FROM sala WHERE capacidade >= $1 ORDER BY capacidade';
    const result = await pool.query(query, [capacidadeMinima]);
    return result.rows;
  }

  // Atualizar sala
  static async update(id, sala) {
    this.validate(sala);
    
    const query = `
      UPDATE sala
      SET local = $1, descricao = $2, capacidade = $3, update_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;
    
    const values = [
      sala.local,
      sala.descricao || null,
      sala.capacidade,
      id
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Excluir sala
  static async delete(id) {
    const query = 'DELETE FROM sala WHERE id = $1';
    await pool.query(query, [id]);
  }

  // Verificar disponibilidade da sala
  static async verificarDisponibilidade(salaId, data, horarioInicio, horarioFinal) {
    const query = `
      SELECT COUNT(*) as conflitos
      FROM reserva
      WHERE id_salas = $1
        AND data = $2
        AND (
          (horario_inicio <= $3 AND horario_final > $3) OR
          (horario_inicio < $4 AND horario_final >= $4) OR
          (horario_inicio >= $3 AND horario_final <= $4)
        )
    `;
    
    const result = await pool.query(query, [salaId, data, horarioInicio, horarioFinal]);
    return parseInt(result.rows[0].conflitos) === 0;
  }

  static async findByFilter(filtro) {
  let query = 'SELECT * FROM sala';
  const conditions = [];
  const values = [];

  if (filtro.local) {
    values.push(`%${filtro.local}%`);
    conditions.push(`local ILIKE $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY local';

  const result = await pool.query(query, values);
  return result.rows;
}

}

module.exports = Sala;