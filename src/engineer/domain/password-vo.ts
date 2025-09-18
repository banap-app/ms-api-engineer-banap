import { ValueObject } from '../../shared/domain/value-objects.js';
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

  static create(password: string) {
    const instance = new Password(password);
    instance.validate();
    return instance;
  }

  get value() {
    return this.password;
  }
}
