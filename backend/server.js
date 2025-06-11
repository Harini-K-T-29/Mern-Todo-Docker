import express from "express";
import cors from "cors";
const app = express();
const PORT = 3000;
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
dotenv.config();
import todoRoutes from "./routes/todoRoutes.js";

app.use(cors());
app.use(express.json());

app.use("/api/v1/todos", todoRoutes);

app.get("/api/v1/status", (req, res) => {
  res.send("Server is live");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectDB();
});
