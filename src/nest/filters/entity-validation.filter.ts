import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityValidationError } from 'src/core/shared/domain/validators/validation-errors';

@Catch(EntityValidationError)
export class EntityValidationFilter implements ExceptionFilter {
  catch(error: EntityValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(HttpStatus.BAD_REQUEST).json({
      message: error.message,
      errors: error.errors,
    });
  }
}
