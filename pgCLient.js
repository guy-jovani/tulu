const pg = require('pg');
const pgClient = new pg.Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
  user: process.env.PG_USER,
  password: process.env.PG_PSW,
});

module.exports = pgClient;
