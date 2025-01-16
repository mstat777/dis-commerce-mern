import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import router from './routes/index.routes.js';

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Dis Commerce Database.'));

const PORT = process.env.PORT || process.env.LOCAL_PORT;
const app = express();

app.use(express.json());
app.use("/api/v.0.1", router);
app.get("*", (req, res) => {
   res.status(404).json({ msg: "not found" });
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));