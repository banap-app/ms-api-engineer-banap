import { HttpException, HttpStatus } from '@nestjs/common';
import type { FieldErrors } from './validator-rules.js';

export abstract class BaseValidationError extends Error {
  constructor(
    public errors: FieldErrors[],
    message = 'Validation Error',
  ) {
    super(message);
  }

  count() {
    return this.errors.length;
  }
}

export class EntityValidationError extends BaseValidationError {
  constructor(public errors: FieldErrors[]) {
    super(errors, 'Entity Validation Error');
    this.name = 'EntityValidationError';
  }
}

export class EntityValidationException extends HttpException {
  constructor(errors: Record<string, string[]>, message?: string) {
    super(
      {
        message: message ? message : 'Entity Validation Error',
        errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
