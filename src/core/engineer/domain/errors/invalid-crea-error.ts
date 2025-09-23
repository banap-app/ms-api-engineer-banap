export class InvalidCREAError extends Error {
  constructor(message?: string) {
    super(message ?? 'invalid CREA');
    this.name = 'InvalidCREAError';
  }
}
