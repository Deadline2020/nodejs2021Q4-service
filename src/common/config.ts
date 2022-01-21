import dotenv from 'dotenv';
import path from 'path';

// import { IConfig } from './types';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'admin',
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'silent',
};

export default config;
