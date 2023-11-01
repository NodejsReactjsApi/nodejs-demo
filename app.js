import express from 'express';
import http from 'http';
import userRoutes from './app/routes/user.js';
import connectDB from './app/config/db.js';
import WebSocketService from './app/socket/socketService.js';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const server = http.createServer(app);
// MongoDB bağlantısı

connectDB()
.then(() => {
    new WebSocketService(server);
})
  .catch((error) => {
    console.error('MongoDB bağlantısı başarısız: ', error);
});

app.use('/user', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});