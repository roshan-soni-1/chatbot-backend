import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { providers } from "../config/models.js";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Available Gemini models (you can expand later)

// const availableModels = [
//   "gemini-1.5-flash",
//   "gemini-1.5-pro"
// ];
const availableModels = providers.gemini.models;

export async function gemini_streamChat(model, messages, res) {
//const useModel = availableModels.includes(model) ? model : "gemini-2.5-flash";
const useModel = availableModels.includes(model) ? model : "";

const modelInstance = genAI.getGenerativeModel({ model: useModel });

// Convert messages into Gemini's expected format
// const history = messages.map(msg => ({
//     role: msg.role,
//     parts: [{ text: msg.content }]
//   }));
// Format messages for Gemini
const history = messages.map(msg => {
let role = msg.role;
if (role === "assistant") role = "model"; // Gemini expects 'model'
return {
role,
parts: [{ text: msg.content }]
};
});

// Start streaming
const result = await modelInstance.generateContentStream({
contents: history
});

// Keep connection alive (optional, like your Groq code)
const keepAlive = setInterval(() => {
// res.write(":\n\n");
}, 15000);

for await (const chunk of result.stream) {
const token = chunk.text();
if (token) {
res.write(token);
}
}

clearInterval(keepAlive);
res.end();
}