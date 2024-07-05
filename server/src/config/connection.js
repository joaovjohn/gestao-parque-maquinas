const pgp = require("pg-promise")();
require('dotenv').config();

const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

module.exports = {
  db
}
