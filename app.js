import express from 'express';
import http from 'http';
import mainRoutes from './app/routes/main.js';
import Database from './app/config/Database.js';
import WebSocketService from './app/socket/socketService.js';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();


// MongoDB bağlantısı
const db = new Database();
db.connect();

const server = http.createServer(app);
new WebSocketService(server);

app.use('/', mainRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});