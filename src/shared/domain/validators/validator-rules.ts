import type { Notification } from './notification.js';

export type FieldErrors = { [field: string]: string } | string;

export interface ValidatorRules {
  validate(notification: Notification, data: any, fields?: string[]): boolean;
}
