import {
  INestApplication,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { contentParser } from 'fastify-multer';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import config from './common/config';

async function bootstrap() {
  let app: INestApplication | NestFastifyApplication;

  if (config.USE_FASTIFY === 'true') {
    const fastify: NestFastifyApplication =
      await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
      );
    fastify.register(contentParser);
    app = fastify;
  } else {
    app = await NestFactory.create(AppModule);
  }
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());

  process.on('uncaughtException', (error: Error): void => {
    throw new InternalServerErrorException(error);
  });

  process.on('unhandledRejection', (reason: Error): void => {
    throw new InternalServerErrorException(reason);
  });

  await app.listen(config.PORT as string, '0.0.0.0', () =>
    process.stdout.write(
      `App is running on http://localhost:${config.PORT} (${
        config.USE_FASTIFY === 'true' ? 'FASTIFY' : 'EXPRESS'
      } platform)\n`
    )
  );
}
bootstrap();
