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
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { UserDto } from './user.dto';
import { UserService } from './user.service';
import STATUS_CODES from 'src/common/status-code';
import { User } from './user.model';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(@Body() userDto: UserDto) {
    // const aaa = await this.userService.addUser(userDto);
    // console.log('addUser: ', aaa);
    // return aaa;
    return await this.userService.addUser(userDto);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    const user: User | undefined = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Put(':userId')
  async updateUser(@Param('userId') userId: string, @Body() userDto: UserDto) {
    const user: User | undefined = await this.userService.updateUser(
      userId,
      userDto,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // console.log('updateUser: ', user);
    return user;
  }

  @Delete(':userId')
  @HttpCode(STATUS_CODES.NO_CONTENT)
  async removeUser(@Param('userId') userId: string) {
    const deleteResult: DeleteResult = await this.userService.removeUser(
      userId,
    );

    if (!deleteResult.affected) {
      throw new NotFoundException('User not found');
    }

    return;
  }
}
