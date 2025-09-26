import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { NotFoundError } from 'src/core/shared/domain/errors/not-found-error';

@Catch(NotFoundError)
export class NotFoundFilter implements ExceptionFilter {
  catch(error: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: error.message,
    });
  }
}
