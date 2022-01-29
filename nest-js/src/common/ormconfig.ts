import dotenv from 'dotenv';
import path from 'path';

import { ORMConnectionOptions } from './types';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const typeORMConfig: ORMConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  migrationsRun: true,
  migrations: [path.join(__dirname, '../migration/*migration{.ts,.js}')],
  cli: {
    migrationsDir: path.join(__dirname, '../migration'),
  },
  autoLoadEntities: true,
};

export default typeORMConfig;
