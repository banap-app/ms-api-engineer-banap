import {
  Notification,
  NotificationStatus,
  NotificationType,
} from 'src/core/notification/domain/notification';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  recipient_id: string;

  @Column({ type: 'uuid' })
  sender_id: string;

  @Column({ type: 'enum', enum: NotificationType })
  notification_type: NotificationType;

  @Column({ type: 'text', nullable: true })
  message: string | null;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  status: NotificationStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  static fromDomain(notification: Notification): NotificationEntity {
    const entity = new NotificationEntity();
    entity.id = notification.id.uuid;
    entity.recipient_id = notification.recipientId.uuid;
    entity.sender_id = notification.senderId.uuid;
    entity.notification_type = notification.notificationType;
    entity.message = notification.message;
    entity.status = notification.status;
    entity.timestamp = notification.timestamp;

    return entity;
  }
}
