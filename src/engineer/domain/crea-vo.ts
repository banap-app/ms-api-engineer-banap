import { Either } from '../../shared/domain/either.js';
import { ValueObject } from '../../shared/domain/value-objects.js';
import { InvalidCREAError } from './errors/invalid-crea-error.js';

export class CREA extends ValueObject {
  private readonly crea: string;

  private constructor(crea: string) {
    super();
    this.crea = crea;
  }

  private validate() {
    const regex: RegExp = /^[0-9]{4,6}-[A-Z]{2}$/;
    const isValid = regex.test(this.crea);
    if (!isValid) {
      throw new InvalidCREAError(
        'Invalid CREA format. Expected format: 123456-XX',
      );
    }
  }

  static createWithValidation(crea: string) {
    const instance = new CREA(crea);
    instance.validate();
    return instance;
  }

  static create(crea: string): Either<CREA, InvalidCREAError> {
    return Either.safe(() => CREA.createWithValidation(crea));
  }

  get value() {
    return this.crea;
  }
}
