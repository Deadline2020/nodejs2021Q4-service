import dotenv from 'dotenv';
import path from 'path';
// import { ConnectionOptions } from 'typeorm';
// import { Board } from 'src/resources/boards/board.model';
// import { Col } from 'src/resources/columns/column.model';
// import { Task } from 'src/resources/tasks/task.model';
// import { User } from 'src/resources/users/user.model';

import { ORMConnectionOptions } from './types';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

// console.log('__dirname: ', __dirname);
const typeORMConfig: ORMConnectionOptions = {
  // const typeORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  // entities: ['src/resources/**/*.model{.ts,.js}'],
  // entities: ['**/resources/**/*.model{.ts,.js}'],
  // entities: [User, Task, Board, Col],
  synchronize: false,
  migrationsRun: true,
  // migrations: ['database/migration/**/*{.ts,.js}'],
  // migrations: ['database/migration/**/*migration{.ts,.js}'],
  // migrations: ['**/1642854718081-migration{.ts,.js}'],
  // migrations: ['**/1642854718081-migration.js'],
  migrations: [path.join(__dirname, '../migration/*migration{.ts,.js}')],
  cli: {
    migrationsDir: path.join(__dirname, '../migration'),
  },
  // cli: {
  //   migrationsDir: 'src/migration',
  // },
  autoLoadEntities: true,
};

// console.log('typeORMConfig: ', typeORMConfig);
// console.log('__dirname: ', path.join(__dirname, '../../.env'));
// console.log('process.env: ', process.env);
export default typeORMConfig;
