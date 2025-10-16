export interface EventPublisher {
  publishMessage(
    exchange: string,
    routingKey: string,
    message: any,
  ): Promise<void>;
}
