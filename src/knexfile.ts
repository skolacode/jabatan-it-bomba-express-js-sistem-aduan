import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3308,
      user: 'bomba_user',
      password: 'bomba_password',
      database: 'bomba_sistem_aduan',
    },
    migrations: {
      extension: 'ts', // Forces knex to look for .ts files
      directory: './src/migrations',
    },
  },
};

export default config;
