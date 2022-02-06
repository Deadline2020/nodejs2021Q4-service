import { Injectable, Logger } from '@nestjs/common';

interface MyRequest extends Request {
  id?: string;
  params?: string;
  query?: string;
}

@Injectable()
export class LoggerService {
  private readonly logger = new Logger();

  log(request: Request) {
    this.logger.log({
      method: request.method,
      url: request.url,
      params: (request as MyRequest).params,
      queryParams: (request as MyRequest).query,
      reqBody: request.body,
    });
  }

  error(request: Request, status: number, message: string) {
    this.logger.error({
      id: (request as MyRequest).id,
      method: request.method,
      url: request.url,
      params: (request as MyRequest).params,
      queryParams: (request as MyRequest).query,
      reqBody: request.body,
      statusCode: status,
      message,
    });
  }
}
