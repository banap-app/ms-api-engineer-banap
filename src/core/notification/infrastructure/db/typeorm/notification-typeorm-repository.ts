import {
  Notification,
  NotificationId,
} from 'src/core/notification/domain/notification';
import { NotificationRepository } from 'src/core/notification/domain/notification-repository';
import { Repository } from 'typeorm';
import { NotificationEntity } from './notification-entity';

export class NotificationTypeOrmRepository implements NotificationRepository {
  private ormRepository: Repository<NotificationEntity>;

  constructor(ormRepository: Repository<NotificationEntity>) {
    this.ormRepository = ormRepository;
  }

  async insert(entity: Notification): Promise<void> {
    const notification = NotificationEntity.fromDomain(entity);
    await this.ormRepository.save(notification);
  }

  async bulkInsert(entities: Notification[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update(entity: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async bulkUpdate(entities: Notification[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(entity_id: NotificationId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async bulkDelete(entities_id: NotificationId[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(entity_id: NotificationId): Promise<Notification> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Notification[]> {
    throw new Error('Method not implemented.');
  }
}
