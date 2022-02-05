import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeORMConfig from './common/ormconfig';
import { LogInterceptor } from './interceptor/log.interceptor';
import loggerConfig from './logger/logger-config';
import { AuthModule } from './resources/auth/auth.module';
import { BoardModule } from './resources/boards/board.module';
import { ColumnModule } from './resources/columns/column.module';
import { FileModule } from './resources/file/file.module';
import { TaskModule } from './resources/tasks/task.module';
import { UserModule } from './resources/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    LoggerModule.forRoot({
      pinoHttp: loggerConfig,
    }),
    UserModule,
    BoardModule,
    ColumnModule,
    TaskModule,
    AuthModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
})
export class AppModule {}
