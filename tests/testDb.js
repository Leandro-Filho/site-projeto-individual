// testDb.js
const pool = require('../src/config/db');

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Conectado ao banco com sucesso!');
    console.log('Hora atual do banco:', result.rows[0]);
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error.message);
  } finally {
    await pool.end(); // Encerra a conexão depois do teste
  }
}

testConnection();
