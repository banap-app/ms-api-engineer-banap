import { validateSync } from 'class-validator';
import type { Notification } from './notification.js';
import type { ValidatorRules } from './validator-rules.js';

export abstract class ClassValidatorRules implements ValidatorRules {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const errors = validateSync(data, {
      groups: fields,
    });
    if (errors.length) {
      for (const error of errors) {
        const field = error.property;
        Object.values(error.constraints!).forEach((message) => {
          notification.addError(message, field);
        });
      }
    }
    return !errors.length;
  }
}
