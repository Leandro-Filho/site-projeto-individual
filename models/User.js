// Importa a configuração do banco de dados
const db = require('../config/db');

class Usuario {
  // Recupera todos os usuários da tabela 'usuarios'
  static async getAll() {
    const result = await db.query('SELECT * FROM usuarios');
    return result.rows;
  }

  // Recupera um usuário específico pelo ID
  static async getById(id) {
    const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Cria um novo usuário com os dados fornecidos
  static async create(data) {
    const result = await db.query(
      `
      INSERT INTO usuarios 
      (senha, email, empresa, numero_celular, create_at, update_at) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *
      `,
      [
        data.senha,
        data.email,
        data.empresa,
        data.numero_celular,
        data.create_at,
        data.update_at
      ]
    );
    return result.rows[0];
  }

  // Atualiza os dados de um usuário específico com base no ID
  static async update(id, data) {
    const result = await db.query(
      `
      UPDATE usuarios 
      SET senha = $1, email = $2, empresa = $3, numero_celular = $4, update_at = $5 
      WHERE id = $6 
      RETURNING *
      `,
      [
        data.senha,
        data.email,
        data.empresa,
        data.numero_celular,
        data.update_at,
        id
      ]
    );
    return result.rows[0];
  }

  // Deleta um usuário específico com base no ID
  static async delete(id) {
    const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0; // Retorna true se algum registro foi deletado
  }
}

// Exporta a classe Usuario para ser utilizada em outras partes da aplicação
module.exports = Usuario;
