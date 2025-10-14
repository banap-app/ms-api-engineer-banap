import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvalidUuidError } from 'src/core/shared/domain/errors/invalid-uuid-error';
import { ApiErrorResponse } from 'src/core/shared/domain/response/api-response';

@Catch(InvalidUuidError)
export class InvalidUuidFilter implements ExceptionFilter {
  catch(error: InvalidUuidError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest();

    const errorResponse: ApiErrorResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: error.message,
      timestamp: new Date().toISOString(),
      path: req.url,
    };
    res.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
