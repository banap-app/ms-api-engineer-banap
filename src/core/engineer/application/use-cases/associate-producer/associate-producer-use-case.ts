import { EngineerId } from 'src/core/engineer/domain/engineer';
import { EngineerRepository } from 'src/core/engineer/domain/engineer-repository';
import { EventPublisher } from 'src/core/shared/application/event-publisher';
import { UseCase } from 'src/core/shared/application/use-case';
import { NotFoundError } from 'src/core/shared/domain/errors/not-found-error';
import { AssociateProducerCommand } from './associate-producer-command';

export type AssociateProducerOutput = void;

export class AssociateProducerUseCase
  implements UseCase<AssociateProducerCommand, AssociateProducerOutput>
{
  constructor(
    private readonly engineerRepository: EngineerRepository,
    private readonly eventPublisher: EventPublisher,
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

    const message = {
      senderId: aCommand.senderId,
      recipientEmail: aCommand.recipientEmail,
      timestamp: new Date().toISOString(),
    };

    await this.eventPublisher.publishMessage(
      'notification_exchange',
      'notification.producer.invite',
      message,
    );
  }
}
