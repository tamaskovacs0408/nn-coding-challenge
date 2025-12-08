import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { authenticate } from "./middlewares/auth.ts";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "nn-coding-challenge-backend"
  })
})

app.use(authenticate);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`);
})