import type { Engineer } from './engineer.js';
import { ClassValidatorRules } from '../../shared/domain/validators/class-validator-rules.js';
import type { Notification } from '../../shared/domain/validators/notification.js';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EngineerRules {
  constructor(entity: Engineer) {
    Object.assign(this, entity);
  }

  @IsString()
  @IsNotEmpty({ groups: ['name'] })
  name!: string;

  @IsEmail()
  @IsNotEmpty({ groups: ['email'] })
  email!: string;
}

export class EngineerValidator extends ClassValidatorRules {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields ? fields : ['name', 'email'];
    return super.validate(notification, new EngineerRules(data), newFields);
  }
}

export class EngineerValidatorFactory {
  static create() {
    return new EngineerValidator();
  }
}
