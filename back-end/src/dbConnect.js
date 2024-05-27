import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'postgres',    // replace with your PostgreSQL username
  host: 'localhost',       // replace with your PostgreSQL host
  database: 'test',// replace with your PostgreSQL database name
  password: 'aaAA11!!',// replace with your PostgreSQL password
  port: 5432,              // replace with your PostgreSQL port
});

// Log a message to confirm the connection is established
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Database connected successfully');
  release();
});

export default pool;
