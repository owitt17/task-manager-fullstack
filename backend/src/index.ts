import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";

dotenv.config();
const app = express();

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
});

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(express.json());

app.use('/api/auth', authRoutes);


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>  {
    console.log(`Server is running on http://localhost:${PORT}`);
});