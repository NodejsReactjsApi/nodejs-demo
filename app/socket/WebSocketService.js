import { Server } from "socket.io";
import RabbitMQService from "../rabbitmq/RabbitMQService.js";
class WebSocketService {
    constructor(server) {
      let rabbitMQService = new RabbitMQService();

      let io = new Server(server, {
        cors: {
          origin: "*",
        }
      });

      io.on('connection', (socket) => {
        console.log('Bir istemci bağlandı.');

        setInterval(async () => {
          let users = null
          await rabbitMQService.listenToUserDbQueue().then(resUsers => users = resUsers);
          socket.emit('userList', users)
        }, 3000); 
  
        socket.on('message', (data) => {
          console.log('İstemciden gelen mesaj:', data);
  
          socket.emit('response', 'Mesajınız alındı');
        });
  
      });
    }
  }

  export default WebSocketService