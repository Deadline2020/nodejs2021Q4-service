import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import config from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.PORT as string, () =>
    process.stdout.write(`App is running on http://localhost:${config.PORT}\n`),
  );
}
bootstrap();
