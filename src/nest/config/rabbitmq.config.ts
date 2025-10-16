export default function rabbitmqConfig() {
  return {
    rabbitmq: {
      url: process.env.RABBITMQ_URL,
      exchanges: {
        notification: 'notification_exchange',
      },
      routingKeys: {
        notification: {
          producerInvite: 'notification.producer.invite',
        },
      },
    },
  };
}
