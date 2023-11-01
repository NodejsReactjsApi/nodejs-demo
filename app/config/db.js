
import mongoose from 'mongoose';
const { connect, connection } = mongoose;

const connectDB = async () => {
    connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        connection.on('connected', () => {
        console.log('MongoDB bağlantısı kuruldu.');
    });

    connection.on('error', (err) => {
        console.log('MongoDB bağlantı hatası: ' + err);
    });
};

export default connectDB