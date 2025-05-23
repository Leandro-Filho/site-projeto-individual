const db = require("../config/db");
const schema = require('../models/userModel');

function validate(data){
    const{error, value} = schema.validate(data);
    if(error) throw error
    return value;
};

module.exports={

async create(user){
    "user" = validate(user);

    const query = 
    `INSERT INTO "user" (nome, email, senha, empresa_escola, celular)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;`;

      const values = [
        user.nome,
        user.email,
        user.senha,
        user.empresa_escola,
        user.celular
        ];
},

async getById(id){
    const query = `SELECT * FROM "user" WHERE id = $1`;
    const res = await pool.query(query, [id]);
    return res.row[0];
},

async getAll(){
    const query = `SELECT * FROM "user"`
    const res = await pool.query(query);
    return res.rows;
},

async getByFilter(filter){
    let baseQuery = `SELECT *FROM "user" WHERE 1=1`;
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
}


