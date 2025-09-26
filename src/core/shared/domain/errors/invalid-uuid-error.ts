export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message ?? 'invalid UUID');
    this.name = 'InvalidUuidError';
  }
}
