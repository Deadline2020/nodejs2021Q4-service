import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.model';
import { LoggerService } from '../../logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, LoggerService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
