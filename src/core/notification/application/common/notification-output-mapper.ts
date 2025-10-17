import { Notification } from '../../domain/notification';

export type NotificationOutput = {
  id: string;
  recipientId: string;
  senderId: string;
  notificationType: string;
  message: string | null;
  status: string;
  timestamp: Date;
};

export class NotificationOutputMapper {
  static toOuptut(entity: Notification) {
    const { notificationId, ...other } = entity.toJSON();
    return {
      id: notificationId,
      ...other,
    };
  }
}
