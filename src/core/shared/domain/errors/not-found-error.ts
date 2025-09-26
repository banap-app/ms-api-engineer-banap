export class NotFoundError extends Error {
  constructor(something?: string) {
    super(`${something} not found`);
    this.name = 'NotFoundError';
  }
}
