import RabbitMQConnector from './RabbitMQConnector.js';
import UserService from '../service/UserService.js';

class RabbitMQService {
  constructor() {
    this.rabbitMQUrl = 'amqp://localhost';
    this.rabbitMQConnector = new RabbitMQConnector(this.rabbitMQUrl);
  }

  async connect() {
    await this.rabbitMQConnector.connect();
  }

  async disconnect() {
    await this.rabbitMQConnector.close();
  }

  async addToDataDbQueue(data) {
    try {
      await this.rabbitMQConnector.connect();

      const message = {
        type: 'dbAction', 
        data: data,
      };

      await this.rabbitMQConnector.sendToQueue(message);
    } catch (error) {
      console.error('Kuyruğa veri eklenirken hata oluştu:', error);
    } finally {
      await this.disconnect();
    }
  }

  
  async listenToUserDbQueue() {
  
    try {
      const queue = 'user-db-queue';
      await this.rabbitMQConnector.connect();
      await this.rabbitMQConnector.channel.consume(queue, async (msg) => {
        if (msg !== null) {
          const message = JSON.parse(msg.content.toString());
          console.log(`[x] Kuyruktan gelen mesaj: ${JSON.stringify(message)}`);
          rabbitMQConnector.channel.ack(msg);
        }
      });
      console.log('[*] Kuyruğu dinleme başladı. Çıkış yapmak için CTRL+C\'ye basın.');

      let users = null;
      await UserService.getUsers().then(resUser => users = resUser)
      return users;
    } catch (error) {
      console.error('Kuyruğu dinlerken hata oluştu:', error);
    }
  }

}

export default RabbitMQService;