import pino from 'pino';
import ENV from './config';

const loggerConfig = {
  // level: ENV.LOGGER_LEVEL as pino.LevelWithSilent,
  transport: {
    targets: [
      {
        // target: 'pino/file',
        target: 'pino-pretty',
        level: 'error' as pino.LevelWithSilent,
        options: {
          levelFirst: true,
          colorize: false,
          translateTime: 'dd-mm-yyyy HH:MM:ss',
          ignore: 'pid,hostname,reqId,req,res,responseTime',
          destination: './logs/error.log',
          mkdir: true,
        },
      },
      {
        level: ENV.LOGGER_LEVEL as pino.LevelWithSilent,
        target: 'pino-pretty',
        // target: 'pino/file',
        options: {
          levelFirst: true,
          colorize: false,
          translateTime: 'dd-mm-yyyy HH:MM:ss',
          ignore: 'pid,hostname,reqId,req,res,responseTime',
          destination: `./logs/${ENV.LOGGER_LEVEL}.log`,
          mkdir: true,
        },
      },
    ],
  },
  // formatters: {
  //   level(label: string, number: number) {
  //     return { level: number };
  //   },
  // },
};

export default loggerConfig;
