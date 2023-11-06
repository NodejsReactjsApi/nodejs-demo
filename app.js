import express from 'express';
import http from 'http';
import mainRoutes from './app/routes/main.js';
import Database from './app/config/Database.js';
import WebSocketService from './app/socket/WebSocketService.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

// MongoDB bağlantısı
const db = new Database();
db.connect();

app.use('/', mainRoutes);

const port = process.env.PORT || 3001;

const server = http.createServer(app);
new WebSocketService(server);


server.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});