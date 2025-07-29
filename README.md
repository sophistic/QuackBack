# 🥆 QuackBack API Documentation

## Getting Started

To start the development server:

```bash
npm run dev
```

---

## ✅ API Endpoints

### 🔐 Auth

#### POST `/api/auth/login`

Request Body:

```json
{
  "email": "string",
  "password": "string"
}
```

#### POST `/api/auth/signup`

Request Body:

```json
{
  "email": "string",
  "name": "string",
  "password": "string"
}
```

---

### 🔑 API Keys

#### POST `/api/key/update`

Request Body:

```json
{
  "email": "string",
  "openai": "string",
  "gemini": "string",
  "anthropic": "string"
}
```

#### GET `/api/key/retrieve?email=example@example.com`

Response:

```json
{
  "user_id": "string",
  "openai": "string",
  "gemini": "string",
  "anthropic": "string"
}
```

---

### 💬 Generate Message

#### POST `/api/generate/msg`

Generates an AI response from the specified provider and model. Saves user and AI messages to the conversation history.

**Request Body:**

```json
{
  "email": "user@example.com",
  "message": "Your prompt to the AI",
  "newConvo": true,
  "conversationId": "null if newConvo else number",
  "provider": "gemini" | "openai" | "anthropic",
  "modelName": "gemini-2.0-flash",
  "apiKey": "your-provider-api-key",
  "messageHistory": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant",
      "content": "Previous AI reply"
    }
  ]
}
```

**Response:**

```json
{
  "userMessage": {
    "content": "Your prompt",
    "user_id": "string",
    "conversation_id": "string"
  },
  "aiMessage": {
    "content": "Generated response",
    "user_id": "string",
    "conversation_id": "string"
  },
  "conversationId": "string",
  "aiResponse": "Generated response"
}
```

---

### 🧪 Health Check

#### GET `/health`

Returns the health status and DB connection status.

---

### 🚀 Root

#### GET `/`

Returns the app live status.

---

### 🌐 Backend Live URL

**[https://quackback-xwhd.onrender.com/](https://quackback-xwhd.onrender.com/)**
