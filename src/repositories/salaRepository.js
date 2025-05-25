const schema = require('../models/salaModel'); // importa o schema Joi
const pool = require('../config/db'); // conexão com o banco

// Função para validar dados com Joi
function validate(data) {
  const { error, value } = schema.validate(data);
  if (error) throw error;
  return value;
}

module.exports = {
  // Criar uma nova sala
  async create(sala) {
    sala = validate(sala);

    const query = `
      INSERT INTO salas (local, descricao, capacidade)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [sala.local, sala.descricao, sala.capacidade];
    const res = await pool.query(query, values);
    return res.rows[0];
  },

  // Buscar todas as salas
  async getAll() {
    const query = `SELECT * FROM salas`;
    const res = await pool.query(query);
    return res.rows;
  },

  // Buscar sala por ID
  async getById(id) {
    const query = `SELECT * FROM salas WHERE id = $1`;
    const res = await pool.query(query, [id]);
    return res.rows[0];
  },

  // Atualizar uma sala
  async update(id, sala) {
    sala = validate(sala);

    const query = `
      UPDATE salas
      SET local = $1, descricao = $2, capacidade = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [sala.local, sala.descricao, sala.capacidade, id];
    const res = await pool.query(query, values);
    return res.rows[0];
  },

  // Deletar uma sala
  async remove(id) {
    const query = `DELETE FROM salas WHERE id = $1`;
    await pool.query(query, [id]);
  },

  // Buscar salas por filtros opcionais (ex: por local ou capacidade mínima)
  async getByFilter(filter) {
    let baseQuery = `SELECT * FROM salas WHERE 1=1`;
    const values = [];
    let idx = 1;

    if (filter.local) {
      baseQuery += ` AND local ILIKE $${idx++}`;
      values.push(`%${filter.local}%`);
    }

    if (filter.capacidadeMin) {
      baseQuery += ` AND capacidade >= $${idx++}`;
      values.push(filter.capacidadeMin);
    }

    const res = await pool.query(baseQuery, values);
    return res.rows;
  },
};
