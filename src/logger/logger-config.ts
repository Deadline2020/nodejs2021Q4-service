import pino, { LoggerOptions } from 'pino';

import config from 'src/common/config';

const loggerConfig: LoggerOptions = {
  level: config.LOGGER_LEVEL,
  transport: {
    targets: [
      {
        level: 'error' as pino.LevelWithSilent,
        target: 'pino-pretty',
        options: {
          levelFirst: true,
          colorize: false,
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
          destination: './logs/error.log',
          mkdir: true,
        },
      },
      {
        level: config.LOGGER_LEVEL as pino.LevelWithSilent,
        target: 'pino-pretty',
        options: {
          levelFirst: true,
          colorize: false,
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
          ignore:
            'pid,hostname,context,req.method,req.url,req.query,req.params,req.headers,req.remoteAddress,req.remotePort,res.headers',
          destination: `./logs/${config.LOGGER_LEVEL}.log`,
          mkdir: true,
        },
      },
    ],
  },
};

export default loggerConfig;
