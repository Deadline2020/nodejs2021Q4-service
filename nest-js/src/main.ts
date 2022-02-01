import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import config from './common/config';

async function bootstrap() {
  let app: INestApplication | NestFastifyApplication;

  if (config.USE_FASTIFY === 'true') {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.PORT as string, '0.0.0.0', () =>
    process.stdout.write(
      `App is running on http://localhost:${config.PORT} (${
        config.USE_FASTIFY === 'true' ? 'FASTIFY' : 'EXPRESS'
      } platform)\n`,
    ),
  );
}
bootstrap();
