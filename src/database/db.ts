// import mysql from 'mysql2/promise'; // Note the /promise path for cleaner syntax
// import dotenv from 'dotenv';

// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'bomba_user',
//   password: process.env.DB_PASSWORD || 'bomba_password',
//   database: process.env.DB_NAME || 'bomba_sistem_aduan',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   port: Number(process.env.DB_PORT) || 3308,
// });

// export default pool;

import knex from 'knex';
import config from '../knexfile';

// 1. Determine your environment
const environment = process.env.NODE_ENV || 'development';

// 2. Access the specific config
const dbConfig = config[environment];

// 3. Check if it exists to satisfy TypeScript
if (!dbConfig) {
  throw new Error(
    `Config for environment "${environment}" not found in knexfile.ts`
  );
}

const db = knex(dbConfig);

export default db;
