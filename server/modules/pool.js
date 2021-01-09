const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
  database: 'weekend-to-do-app',
  host: 'localhost',
  port: 5432
});

// checks
pool.on('connect', () => {
  console.log('PG connected');
});
pool.on('error', (error) => {
  console.log(error);
});

module.exports = pool;