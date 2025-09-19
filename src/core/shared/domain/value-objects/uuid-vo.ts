import { InvalidUuidError } from '../errors/invalid-uuid-error.js';
import { ValueObject } from '../value-objects.js';
import { v4 as uuidV4, validate as validateUuid } from 'uuid';

export class Uuid extends ValueObject {
  readonly uuid: string;

  constructor(uuid?: string) {
    super();
    this.uuid = uuid ? uuid : uuidV4();
    this.validate();
  }

  private validate(): void {
    const isValid = validateUuid(this.uuid);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }

  get id(): string {
    return this.uuid;
  }
}
