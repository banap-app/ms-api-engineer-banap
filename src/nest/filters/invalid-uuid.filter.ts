import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvalidUuidError } from 'src/core/shared/domain/errors/invalid-uuid-error';

@Catch(InvalidUuidError)
export class InvalidUuidFilter implements ExceptionFilter {
  catch(error: InvalidUuidError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
}
