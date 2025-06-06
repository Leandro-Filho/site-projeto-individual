const pool = require('../config/db');

class Usuario {
  // Validar dados básicos
  static validate(usuario) {
    if (!usuario.email) throw new Error('Email é obrigatório');
    if (!usuario.senha) throw new Error('Senha é obrigatória');
    return usuario;
  }

  // Criar usuário
  static async create(usuario) {
    this.validate(usuario);
    
    const query = `
      INSERT INTO usuario (email, senha, empresa_escola, numero_celular)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const values = [
      usuario.email,
      usuario.senha,
      usuario.empresa_escola || null,
      usuario.numero_celular || null
    ];
    

    const result = await pool.query(query, values);
    return result.rows[0];

  }

  // Buscar todos os usuários
  static async findAll() {
    const query = 'SELECT * FROM usuario ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  // Buscar usuário por ID
  static async findById(id) {
    const query = 'SELECT * FROM usuario WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Buscar usuário por email
  static async findByEmail(email) {
    const query = 'SELECT * FROM usuario WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  // Atualizar usuário
  static async update(id, usuario) {
    this.validate(usuario);
    
    const query = `
      UPDATE usuario
      SET email = $1, empresa_escola = $2, numero_celular = $3, update_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;
    
    const values = [
      usuario.email,
      usuario.empresa_escola || null,
      usuario.numero_celular || null,
      id
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Atualizar senha
  static async updatePassword(id, senha) {
    if (!senha) throw new Error('Senha é obrigatória');
    
    const query = `
      UPDATE usuario
      SET senha = $1, update_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    
    const result = await pool.query(query, [senha, id]);
    return result.rows[0];
  }

  // Excluir usuário
  static async delete(id) {
    const query = 'DELETE FROM usuario WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = Usuario;
