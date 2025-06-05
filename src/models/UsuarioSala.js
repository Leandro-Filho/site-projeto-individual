const pool = require('../config/db');

class UsuarioSala {
  // Validar dados básicos
  static validate(usuarioSala) {
    if (!usuarioSala.id_user) throw new Error('ID do usuário é obrigatório');
    if (!usuarioSala.id_salas) throw new Error('ID da sala é obrigatório');
    return usuarioSala;
  }

  // Associar um usuário a uma sala
  static async create(usuarioSala) {
    this.validate(usuarioSala);
    
    const query = `
      INSERT INTO usuario_sala (id_user, id_salas)
      VALUES ($1, $2)
      RETURNING *
    `;
    
    const values = [
      usuarioSala.id_user,
      usuarioSala.id_salas
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Verificar se um usuário está associado a uma sala
  static async verificarAssociacao(id_user, id_salas) {
    const query = `
      SELECT * FROM usuario_sala 
      WHERE id_user = $1 AND id_salas = $2
    `;
    
    const result = await pool.query(query, [id_user, id_salas]);
    return result.rows.length > 0;
  }

  // Buscar todas as salas associadas a um usuário
  static async findSalasByUsuario(usuarioId) {
    const query = `
      SELECT s.*
      FROM sala s
      JOIN usuario_sala us ON s.id = us.id_salas
      WHERE us.id_user = $1
      ORDER BY s.local
    `;
    
    const result = await pool.query(query, [usuarioId]);
    return result.rows;
  }

  // Buscar todos os usuários associados a uma sala
  static async findUsuariosBySala(salaId) {
    const query = `
      SELECT u.*
      FROM usuario u
      JOIN usuario_sala us ON u.id = us.id_user
      WHERE us.id_salas = $1
      ORDER BY u.email
    `;
    
    const result = await pool.query(query, [salaId]);
    return result.rows;
  }

  // Remover associação entre usuário e sala
  static async delete(id_user, id_salas) {
    const query = `
      DELETE FROM usuario_sala 
      WHERE id_user = $1 AND id_salas = $2
    `;
    
    await pool.query(query, [id_user, id_salas]);
  }
}

module.exports = UsuarioSala;