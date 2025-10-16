export default function rabbitmqConfig() {
  return {
    rabbitmq: {
      url: process.env.RABBITMQ_URL,
    },
  };
}
