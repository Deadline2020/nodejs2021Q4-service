import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';

import config from 'src/common/config';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (
      req.url.startsWith('/login') ||
      req.url.startsWith('/doc') ||
      req.url === '/'
    ) {
      return true;
    }

    const [typeToken, token] = req.headers.authorization?.split(' ') || [
      '',
      '',
    ];

    if (typeToken !== 'Bearer') {
      throw new UnauthorizedException();
    }

    try {
      jwt.verify(token, config.JWT_SECRET_KEY);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
