import { Repository } from 'src/core/shared/domain/repository/repository';
import { Notification, NotificationId } from './notification';

export interface NotificationRepository
  extends Repository<Notification, NotificationId> {}
