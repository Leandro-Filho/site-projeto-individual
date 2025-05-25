const schema = require('../models/userModel');
const pool = require('../config/db');


function validate(data){
    const{error, value} = schema.validate(data);
    if(error) throw error
    return value;
};

module.exports={

async create(user) {
  user = validate(user);

  const query = `
    INSERT INTO "user" (nome, email, senha, empresa_escola, celular)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    user.nome,
    user.email,
    user.senha,
    user.empresa_escola,
    user.celular
  ];

  const res = await pool.query(query, values);
  return res.rows[0]; // ← ESSENCIAL: retorna o usuário criado
},


async getById(id){
    const query = `SELECT * FROM "user" WHERE id = $1`;
    const res = await pool.query(query, [id]);
    return res.rows[0];
},

async getAll(){
    const query = `SELECT * FROM "user"`
    const res = await pool.query(query);
    return res.rows;
},
 async getByFilter(filter) {
    // filter = { email?, nome? }
    let baseQuery = 'SELECT * FROM "user" WHERE 1=1';
    const values = [];
    let idx = 1;

    if (filter.email) {
      baseQuery += ` AND email ILIKE $${idx++}`;
      values.push(`%${filter.email}%`);
    }
    if (filter.nome) {
      baseQuery += ` AND nome ILIKE $${idx++}`;
      values.push(`%${filter.nome}%`);
    }

    const res = await pool.query(baseQuery, values);
    return res.rows;
  },

  async update(id, user) {
      // Atualiza dados básicos, exceto senha (tem método separado)
      const query = `
        UPDATE "user" SET nome=$1, email=$2, empresa_escola=$3, celular=$4
        WHERE id=$5 RETURNING *;
      `;
      const values = [
        user.nome,
        user.email,
        user.empresa_escola,
        user.celular,
        id,
      ];
  
      const res = await pool.query(query, values);
      return res.rows[0];
    },

    async update(id, user) {
    // Atualiza dados básicos, exceto senha (tem método separado)
    const query = `
      UPDATE "user" SET nome=$1, email=$2, empresa_escola=$3, celular=$4
      WHERE id=$5 RETURNING *;
    `;
    const values = [
      user.nome,
      user.email,
      user.empresa_escola,
      user.celular,
      id,
    ];
    const res = await pool.query(query, values);
        return res.rows[0];
      },

async updateSenha(id, novaSenha) {
    const query = `UPDATE "user" SET senha=$1 WHERE id=$2 RETURNING *;`;
    const res = await pool.query(query, [novaSenha, id]);
    return res.rows[0];
  },

  async delete(id) {
    const query = `DELETE FROM "user" WHERE id=$1;`;
    await pool.query(query, [id]);
  },

  // Método para buscar perfil completo (com reservas e notificações)
    async getPerfil(id) {
      // Aqui fazemos 3 consultas e juntamos resultados
      const userQuery = 'SELECT id, nome, email, empresa_escola, celular FROM "user" WHERE id=$1';
      const reservasQuery = 'SELECT * FROM reservas WHERE id_user=$1';
      const notificacoesQuery = `
        SELECT n.*
        FROM notificacoes n
        JOIN user_notificacao un ON n.id = un.id_notificacao
        WHERE un.id_user = $1
      `;
  
      const userRes = await pool.query(userQuery, [id]);
      if (userRes.rows.length === 0) return null;
  
      const reservasRes = await pool.query(reservasQuery, [id]);
      const notificacoesRes = await pool.query(notificacoesQuery, [id]);
  
      return {
        ...userRes.rows[0],
        reservas: reservasRes.rows,
        notificacoes: notificacoesRes.rows,
      };
    }

}