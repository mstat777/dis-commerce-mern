import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = () => {
   mongoose.connect(process.env.DATABASE_URL)
      .catch(err => handleError(err));
   const connect = mongoose.connection;

   connect.on('error', (err) => console.log(err));
   connect.once('open', () => console.log('Connected to Dis Commerce Database.'));
}