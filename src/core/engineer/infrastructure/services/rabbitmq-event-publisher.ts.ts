import { EventPublisher } from 'src/core/shared/application/event-publisher';
import { RabbitMQService } from 'src/nest/common/rabbitmq/rabbitmq.service';

export class RabbitMQEventPublisher implements EventPublisher {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async publishMessage(
    exchange: string,
    routingKey: string,
    message: any,
  ): Promise<void> {
    await this.rabbitMQService.publishMessage(exchange, routingKey, message);
  }
}
