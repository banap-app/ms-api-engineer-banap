import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { NotFoundError } from 'src/core/shared/domain/errors/not-found-error';
import { ApiErrorResponse } from 'src/core/shared/domain/response/api-response';

@Catch(NotFoundError)
export class NotFoundFilter implements ExceptionFilter {
  catch(error: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest();

    const errorResponse: ApiErrorResponse = {
      statusCode: HttpStatus.NOT_FOUND,
      message: error.message,
      timestamp: new Date().toISOString(),
      path: req.url,
    };
    res.status(HttpStatus.NOT_FOUND).json(errorResponse);
  }
}
