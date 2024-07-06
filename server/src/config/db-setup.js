// db-setup.js
const pgp = require('pg-promise')();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function createDatabase() {

  const client = pgp({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();
    const res = await client.oneOrNone(`SELECT 1 FROM pg_database WHERE datname='${process.env.DB_NAME}'`);
    if (!res) {
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Banco de dados ${process.env.DB_NAME} criado com sucesso.`);
    } else {
      console.log(`Banco de dados ${process.env.DB_NAME} já existe.`);
    }
  } catch (err) {
    console.error('Erro ao criar banco de dados:', err);
  } finally {
    await pgp.end();
  }
}

async function runMigrations() {
  const client = pgp({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsDir).sort();

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      await client.query(sql);
      console.log(`Migração ${file} executada com sucesso.`);
    }
    console.log('Migrações executadas com sucesso.');
  } catch (err) {
    console.error('Erro ao executar migrações:', err);
  } finally {
    console.log('Fechando conexão com o banco de dados.');
    await pgp.end();
  }
}

async function setupDatabase() {
  await createDatabase();
  await runMigrations();
}

setupDatabase();
