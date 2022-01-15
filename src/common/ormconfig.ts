import { ConnectionOptions } from 'typeorm';

import dotenv from 'dotenv';
import path from 'path';

// import { IConfig } from './types';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const typeORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/resources/**/*.model{.ts,.js}'],
  synchronize: false,
  migrations: ['database/migration/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'database/migration',
  },
};

export default typeORMConfig;
