import amqp from 'amqplib';

class RabbitMQConnector {
  constructor(rabbitMQUrl) {
    this.rabbitMQUrl = rabbitMQUrl;
  }

  async connect() {
    try {
      this.connection = await amqp.connect(this.rabbitMQUrl);
      this.channel = await this.connection.createChannel();

      const queue = 'user-db-queue';
      await this.channel.assertQueue(queue, { durable: true });

      console.log('RabbitMQ bağlantısı başarılı.');
    } catch (error) {
      console.error('RabbitMQ bağlantısı başarısız:', error);
      throw error;
    }
  }

  async sendToQueue(message) {
    const queue = 'user-db-queue';
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log(`[x] Kuyruğa mesaj gönderildi: ${JSON.stringify(message)}`);
  }

  async close() {
    if (this.connection) {
      await this.connection.close();
      console.log('RabbitMQ bağlantısı kapatıldı.');
    }
  }
}

export default RabbitMQConnector;