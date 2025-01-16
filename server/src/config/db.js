import mongoose from 'mongoose';
import 'dotenv/config';


/*
export const connectDB = async () => {
   try {
      await mongoose.connect(process.env.DATABASE_URL);
      //console.log(`MongoDB Connected: {conn.connection.host}`);

      //const connect = mongoose.connection;

      connect.on('error', async (error) => console.log(error));
      connect.once('open', async () => console.log('Connected to Dis Commerce Database.'));
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}*/

export const connectDB = () => {
   mongoose.connect(process.env.DATABASE_URL).catch(err => handleError(err));
   const connect = mongoose.connection;

   connect.on('error', (err) => console.log(err));
   connect.once('open', () => console.log('Connected to Dis Commerce Database.'));
}