export class InvalidPasswordError extends Error {
  constructor(message?: string) {
    super(message ?? 'invalid password');
    this.name = 'InvalidPasswordError';
  }
}
