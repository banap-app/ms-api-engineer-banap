import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiErrorResponse } from 'src/core/shared/domain/response/api-response';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch(QueryFailedError, TypeORMError)
export class DatabaseErrorFilter implements ExceptionFilter {
  catch(error: QueryFailedError | TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const errorResponse: ApiErrorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Database operation failed',
      timestamp: new Date().toISOString(),
    };
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
