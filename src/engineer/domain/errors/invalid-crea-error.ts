export class InvalidCREAError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid CREA');
    this.name = 'InvalidCREAError';
  }
}
