import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config(); // MUST be called before using process.env
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function groq_streamChat(model, messages, res) {
  try {
    const stream = await groq.chat.completions.create({
      model,
      messages,
      stream: true,
    });

    const keepAlive = setInterval(() => res.write(":\n\n"), 15000);

    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content || "";
      if (token) res.write(token);
    }

    clearInterval(keepAlive);
    res.end();
  } catch (err) {
    console.error("Groq API error:", err);
    res.write(`data: [ERROR] ${err}\n\n`);
    res.end();
  }
}