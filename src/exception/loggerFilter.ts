import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import STATUS_CODES from '../common/status-code';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class LoggerFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const request = host.switchToHttp().getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : STATUS_CODES.INTERNAL_SERVER_ERROR;
    const message = exception.message;

    if (status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
      this.loggerService.error(request, status, message);
    }

    response.status(status).send({
      statusCode: status,
      message,
    });
  }
}
