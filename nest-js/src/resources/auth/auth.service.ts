import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

import { AuthDto } from './auth.dto';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';
import config from 'src/common/config';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async getToken(authDto: AuthDto): Promise<string | undefined> {
    const user: User | undefined = await this.userService.getUserByLogin(
      authDto.login,
    );
    let token: string | undefined;

    if (user) {
      // const isCorrectPassword = await bcrypt.compare(password, user.password);
      const isCorrectPassword = authDto.password === user.password;

      if (isCorrectPassword) {
        const payload = { userId: user.id, login: user.login };
        token = jwt.sign(payload, config.JWT_SECRET_KEY);
      }
    }

    return token;
  }
}
