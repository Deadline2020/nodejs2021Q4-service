import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'admin',
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'silent',
  ADMIN_DEFAULT_LOGIN: process.env.ADMIN_DEFAULT_LOGIN || 'admin',
  ADMIN_DEFAULT_PASSWORD: process.env.ADMIN_DEFAULT_PASSWORD || 'admin',
};

export default config;
