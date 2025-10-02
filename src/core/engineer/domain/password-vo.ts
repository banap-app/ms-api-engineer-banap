import { Either } from '../../shared/domain/either.js';
import { ValueObject } from '../../shared/domain/value-object.js';
import { InvalidPasswordError } from './errors/invalid-password-error.js';

export class Password extends ValueObject {
  private readonly password: string;

  private constructor(password: string) {
    super();
    this.password = password;
  }

  static hashPassword(hashPassword: string) {
    return new Password(hashPassword);
  }

  private validate() {
    const regex: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    const isValid = regex.test(this.password);
    if (!isValid) {
      throw new InvalidPasswordError();
    }
  }

  static createWithValidation(password: string) {
    const instance = new Password(password);
    instance.validate();
    return instance;
  }

  static create(password: string): Either<Password, InvalidPasswordError> {
    return Either.safe(() => Password.createWithValidation(password));
  }

  get value() {
    return this.password;
  }
}
