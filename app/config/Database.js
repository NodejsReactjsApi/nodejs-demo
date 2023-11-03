import mongoose from 'mongoose';

class Database {
  static instance = null;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    Database.instance = this;
  }

  connect() {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB bağlantısı kuruldu.');
    });

    connection.on('error', (err) => {
      console.log('MongoDB bağlantı hatası: ' + err);
    });
  }
}

export default Database;