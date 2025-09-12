import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./routes/chat.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Groq streaming server is running. Use POST /chat");
});

// Mount chat routes
app.use("/chat", chatRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Streaming server running at http://localhost:${PORT}`);
});