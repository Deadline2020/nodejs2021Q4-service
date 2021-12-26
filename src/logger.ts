import pino from 'pino';

import ENV from './common/config';

const loggerConfig = {
  level: ENV.LOGGER_LEVEL as pino.LevelWithSilent,
  transport: {
    targets: [
      {
        level: 'error' as pino.LevelWithSilent,
        target: 'pino-pretty',
        options: {
          levelFirst: true,
          colorize: false,
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
          ignore: 'pid,hostname,reqId,req,res,responseTime',
          destination: './logs/error.log',
          mkdir: true,
        },
      },
      {
        level: ENV.LOGGER_LEVEL as pino.LevelWithSilent,
        target: 'pino-pretty',
        options: {
          levelFirst: true,
          colorize: false,
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
          ignore: 'pid,hostname,reqId,req,res,responseTime',
          destination: `./logs/${ENV.LOGGER_LEVEL}.log`,
          mkdir: true,
        },
      },
    ],
  },
};

const logger = pino(loggerConfig);

export default logger;
