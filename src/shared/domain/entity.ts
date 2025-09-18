import { Notification } from './validators/notification.js';
import type { ValueObject } from './value-objects.js';

export abstract class Entity {
  notification: Notification = new Notification();
  abstract get id(): ValueObject;
  abstract toJSON(): any;
}
