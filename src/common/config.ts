import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

interface IENV {
  PORT: string | undefined;
  NODE_ENV: string | undefined;
  MONGO_CONNECTION_STRING: string | undefined;
  JWT_SECRET_KEY: string | undefined;
  AUTH_MODE: boolean;
  LOGGER_LEVEL: string;
}

const ENV: IENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'silent',
};

export default ENV;