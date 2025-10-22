import { Entity } from 'src/core/shared/domain/entity';
import { Uuid } from 'src/core/shared/domain/value-objects/uuid-vo';

export enum NotificationType {
  INVITE = 'INVITE',
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export type NotificationConstructorProps = {
  notificationId?: NotificationId;
  recipientId: Uuid;
  senderId: Uuid;
  notificationType: NotificationType;
  message?: string;
  status: NotificationStatus;
  timestamp?: Date;
};

export type NotificationCreateProps = {
  recipientId: string;
  senderId: string;
  notificationType: NotificationType;
  message?: string;
};

export class NotificationId extends Uuid {}

export class Notification extends Entity {
  private readonly _notificationId: NotificationId;
  private readonly _recipientId: Uuid;
  private readonly _senderId: Uuid;
  private readonly _notificationType: NotificationType;
  private readonly _message: string | null;
  private _status: NotificationStatus;
  private readonly _timestamp: Date;

  constructor(props: NotificationConstructorProps) {
    super();
    this._notificationId = props.notificationId ?? new NotificationId();
    this._recipientId = props.recipientId;
    this._senderId = props.senderId;
    this._notificationType = props.notificationType;
    this._message = props.message ?? null;
    this._status = props.status;
    this._timestamp = props.timestamp ?? new Date();
  }

  static create(props: NotificationCreateProps) {
    return new Notification({
      recipientId: new Uuid(props.recipientId),
      senderId: new Uuid(props.senderId),
      notificationType: props.notificationType,
      message: props.message ?? null,
      status: NotificationStatus.PENDING,
      timestamp: new Date(),
    });
  }

  get id(): NotificationId {
    return this._notificationId;
  }

  get recipientId(): Uuid {
    return this._recipientId;
  }

  get senderId(): Uuid {
    return this._senderId;
  }

  get notificationType(): NotificationType {
    return this._notificationType;
  }

  get message(): string {
    return this._message;
  }

  get status(): NotificationStatus {
    return this._status;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  public accept() {
    if (this._status !== NotificationStatus.PENDING) {
      this.notification.addError(
        'Only pending notifications can be accepted',
        'status',
      );
      return;
    }
    this._status = NotificationStatus.ACCEPTED;
  }

  public reject() {
    if (this._status !== NotificationStatus.PENDING) {
      this.notification.addError(
        'Only pending notifications can be rejected',
        'status',
      );
      return;
    }
    this._status = NotificationStatus.REJECTED;
  }

  toJSON() {
    return {
      notificationId: this._notificationId.uuid,
      recipientId: this._recipientId.uuid,
      senderId: this._senderId.uuid,
      notificationType: this._notificationType,
      message: this._message,
      status: this._status,
      timestamp: this._timestamp.toISOString(),
    };
  }
}
