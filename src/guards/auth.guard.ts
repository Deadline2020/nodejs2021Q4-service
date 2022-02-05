import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';

import config from 'src/common/config';
import { LogInterceptor } from 'src/interceptor/log.interceptor';
import logger from 'src/logger/logger';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(LogInterceptor.name);

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
      logger(req);
      throw new UnauthorizedException();
    }

    try {
      jwt.verify(token, config.JWT_SECRET_KEY);
    } catch (error) {
      logger(req);
      throw new UnauthorizedException();
    }

    return true;
  }
}
