import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import router from './routes/index.routes.js';
import { connectDB } from './config/db.js';


connectDB();

const PORT = process.env.PORT || process.env.LOCAL_PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v.0.1", router);
app.get("*", (req, res) => {
   res.status(404).json({ msg: "not found" });
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));