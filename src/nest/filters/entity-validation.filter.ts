import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiErrorResponse } from 'src/core/shared/domain/response/api-response';
import { EntityValidationError } from 'src/core/shared/domain/validators/validation-errors';

@Catch(EntityValidationError)
export class EntityValidationFilter implements ExceptionFilter {
  catch(error: EntityValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest();

    const errorResponse: ApiErrorResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: error.message,
      errors: error.errors,
      timestamp: new Date().toISOString(),
      path: req.url,
    };
    res.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
