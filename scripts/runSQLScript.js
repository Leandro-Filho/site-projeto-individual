import fs from 'fs';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function runSQLScript(filePath) {
  const client = await pool.connect();
  try {
    const sql = fs.readFileSync(filePath, 'utf-8');
    const commands = sql
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0);

    for (const command of commands) {
      if (command.startsWith('--') || command.startsWith('/*')) continue;
      console.log('Executando:', command.slice(0, 50).replace(/\n/g, ' ') + '...');
      await client.query(command);
    }
    console.log('✅ Script executado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar script:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

const pathSQL = './scripts/init.sql';
runSQLScript(pathSQL);

