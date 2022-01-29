import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeORMConfig from './common/ormconfig';
import { BoardModule } from './resources/boards/board.module';
import { ColumnModule } from './resources/columns/column.module';
import { TaskModule } from './resources/tasks/task.module';
import { UserModule } from './resources/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    BoardModule,
    ColumnModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
