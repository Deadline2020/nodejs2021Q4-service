import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async getToken(@Body() authDto: AuthDto) {
    const token: string | undefined = await this.authService.getToken(authDto);

    if (!token) {
      throw new ForbiddenException();
    }

    return { token };
  }
}
