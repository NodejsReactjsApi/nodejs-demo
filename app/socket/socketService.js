import { Server } from "socket.io";
import mongoose from "mongoose";

class WebSocketService {
    constructor(server) {
      this.io = new Server(server);
      this.initialize();
    }
  
    initialize() {
      this.io.on('connection', (socket) => {
        console.log('Bir istemci bağlandı.');

        setInterval(() => {
            this.sendCollectionData(socket);
        }, 1000); // Örneğin, her saniye
  
        // Örnek bir olayı dinle ve işle
        socket.on('message', (data) => {
          console.log('İstemciden gelen mesaj:', data);
  
          // İstemcilere yanıt gönder
          socket.emit('response', 'Mesajınız alındı');
        });
  
        // İstemcilere gerçek zamanlı veri gönderme
        setInterval(() => {
          socket.emit('realtimeData', { time: new Date() });
        }, 1000);
      });
    }

    sendCollectionData(socket) {
        const User = mongoose.model('User');
        User.find({}) 
          .exec()
          .then((data) => {
            socket.emit('collectionData', { data });
          })
          .catch((error) => {
            console.error('Koleksiyon verileri alınamadı: ', error);
          });
    }
  }

  export default WebSocketService