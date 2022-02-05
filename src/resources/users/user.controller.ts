import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { UserDto } from './user.dto';
import { UserService } from './user.service';
import STATUS_CODES from 'src/common/status-code';
import { User } from './user.model';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(@Body() userDto: UserDto): Promise<User> {
    return await this.userService.addUser(userDto);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    const user: User | undefined = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() userDto: UserDto,
  ): Promise<User> {
    const user: User | undefined = await this.userService.updateUser(
      userId,
      userDto,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Delete(':userId')
  @HttpCode(STATUS_CODES.NO_CONTENT)
  async removeUser(@Param('userId') userId: string): Promise<void> {
    const deleteResult: DeleteResult = await this.userService.removeUser(
      userId,
    );

    if (!deleteResult.affected) {
      throw new NotFoundException('User not found');
    }

    return;
  }
}
