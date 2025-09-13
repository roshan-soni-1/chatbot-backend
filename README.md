# chatbot-backend

![Node.js](https://img.shields.io/badge/Node.js-v18-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)


This is the backend server for the **Chat bot** application.It uses groq and gemini api service. It provides:

- Streaming chat API  
- Available models/providers for frontend

---

## Table of Contents

- [Setup](#setup)
- [Run Server](#run-server)
- [Endpoints](#endpoints)
- [Project Structure](#project-structure)
- [Notes](#notes)
---

## Setup

1. Clone the repository:

```bash
git clone 'https://github.com/roshan-soni-1/chatbot-backend'
```
```bash
cd chatbot-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root:

```Txt
GROQ_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your__api_key_here
PORT=3000
```

> ⚠️ Do not commit `.env` to version control.

---

## Run Server

Start the server:
```bash
npm start
```
You should see:

✅ Streaming server running at `http://localhost:3000`

---

## Endpoints

1. **Root**  
`GET /`  
Returns a simple message:

✅ Groq backend is running. Use /chat for API.

2. **Chat Streaming**  
POST /chat  
Headers: Content-Type: application/json  
Body example:
```UTF
{
  "model": "gemma2-9b-it",
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}
```

Response: Server-Sent Events (SSE) stream of tokens.

Endpoint    | Method | Description
------------------ | ------ | -----------------------
/               | GET | Check server status
/chat           | POST  | Stream chat messages
/chat/providers | GET | List available models

---

3. **Providers / Models**  
GET /chat/providers  
Returns available providers and models:
```UTF
{
  "groq": {
    "name": "Groq",
    "models": ["gemma2-9b-it", "llama-3.1-8b-instant", "allam-2-7b"]
  },
  "gemini": {
    "name": "Gemini",
    "models": ["gemini-2.5-flash"]
  }
}
```

---

## Project Structure
```txt
groq-backend/
├─ server.js
├─ package.json
├─ .env
├─ config/
│   └─ models.js
├─ services/
│   └─ groq_service.js
│   └─ gemini_service.js
├─ routes/
│   └─ chat.js
└─ node_modules/
```
---

## Notes

- Ensure your GROQ_API_KEY is valid.  
- The server uses Server-Sent Events (SSE) for streaming responses.  
- Frontend can fetch available models via /chat/providers.
---
## License
MIT License

## Contributing
Feel free to open issues or submit pull requests!
---