import express from "express";
import { groq_streamChat } from "../services/groq_service.js";
import { gemini_streamChat } from "../services/gemini_service.js";
import { providers } from "../config/models.js"; // <-- static provider/models config

const router = express.Router();

// POST /chat → Stream chat
router.post("/", async (req, res) => {
  try {
    const { messages, model, provider } = req.body;

    // SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    if (provider === "gemini") {
      await gemini_streamChat(model, messages, res);
    } else {
      await groq_streamChat(model, messages, res);
    }

  } catch (err) {
    console.error("Chat error:", err);
    res.write(`data: [ERROR] ${err}\n\n`);
    res.end();
  }
});

// ✅ GET /chat/providers → Return available providers + models
router.get("/providers", (req, res) => {
  res.json(providers);
});

export default router;