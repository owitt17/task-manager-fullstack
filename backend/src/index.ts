import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>  {
    console.log(`Server is running on port: ${PORT}`);
});