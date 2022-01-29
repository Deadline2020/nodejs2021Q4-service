import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDto } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async addUser(userDto: UserDto): Promise<User> {
    const newUser: User = this.userRepo.create(userDto);
    return await this.userRepo.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async getUserById(userId: string): Promise<User | undefined> {
    return await this.userRepo.findOne(userId);
  }

  // async getUserByLogin(login: string): Promise<User | undefined> {
  //   return await this.userRepo.findOne({ where: { login } });
  // }

  async updateUser(id: string, userDto: UserDto): Promise<User | undefined> {
    const user: User | undefined = await this.getUserById(id);

    if (user) {
      const newUser: UserDto = { ...userDto };
      // newUser.password = await getHash(userDto.password);
      this.userRepo.merge(user, newUser);
      return await this.userRepo.save(user);
    }

    return undefined;
  }

  async removeUser(id: string): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }
}
