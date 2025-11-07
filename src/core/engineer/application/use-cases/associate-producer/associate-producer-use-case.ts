import { EngineerId } from 'src/core/engineer/domain/engineer';
import { EngineerRepository } from 'src/core/engineer/domain/engineer-repository';
import {
  Notification,
  NotificationType,
} from 'src/core/notification/domain/notification';
import { NotificationRepository } from 'src/core/notification/domain/notification-repository';
import { EventPublisher } from 'src/core/shared/application/event-publisher';
import { HttpClient } from 'src/core/shared/application/http-client';
import { UseCase } from 'src/core/shared/application/use-case';
import { NotFoundError } from 'src/core/shared/domain/errors/not-found-error';
import { AssociateProducerCommand } from './associate-producer-command';

export type AssociateProducerOutput = void;

export class AssociateProducerUseCase
  implements UseCase<AssociateProducerCommand, AssociateProducerOutput>
{
  constructor(
    private readonly engineerRepository: EngineerRepository,
    private readonly notificationRepository: NotificationRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly httpClient: HttpClient,
  ) {}

  async execute(
    aCommand: AssociateProducerCommand,
  ): Promise<AssociateProducerOutput> {
    const sender = await this.engineerRepository.findById(
      new EngineerId(aCommand.senderId),
    );
    if (!sender || !sender.isActive) {
      throw new NotFoundError('engineer');
    }

    const response = await this.httpClient.get<{ id: string }>(
      `/producer/exists/${aCommand.recipientEmail}`,
      {
        baseURL: process.env.PRODUCER_BASE_URL,
        headers: {
          Authorization: aCommand.authToken,
        },
      },
    );
    if (!response.id) {
      throw new NotFoundError('producer');
    }

    const recipientId = response.id;

    const notification = Notification.create({
      recipientId: recipientId,
      senderId: aCommand.senderId,
      notificationType: NotificationType.INVITE,
    });

    await this.notificationRepository.insert(notification);

    await this.eventPublisher.publishMessage(
      'notification_exchange',
      'notification.producer.invite',
      notification.toJSON(),
    );
  }
}
