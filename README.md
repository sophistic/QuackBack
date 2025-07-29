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
Response Body:
```json
{
"message":"true |  false"
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
Response Body:
```json
{
"message":"true | false"
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
  "conversationId": "optional-if-newConvo-false",
  "provider": "gemini | openai | anthropic",
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
    "user_id": "number",
    "sender" :"user",
    "conversation_id": "number"
  },
  "aiMessage": {
    "content": "Generated response",
    "user_id": "number",
    "sender":"Assisstant",
    "conversation_id": "number"
  },
  "conversationId": "number",
  "aiResponse": "Generated response"
}
```

---

### 📒 Conversations

#### GET `/api/conversations/title`

Fetches all conversation titles associated with a given user's email.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
[
  {
    "id": "1",
    "created_at": "2025-07-28T10:00:00Z",
    "title": "Trip Planning Assistant",
    "user_id": "abc123",
    "updated_at": "2025-07-28T10:30:00Z"
  },
  {
    "id": "2",
    "created_at": "2025-07-27T09:00:00Z",
    "title": "AI Coding Tutor",
    "user_id": "abc123",
    "updated_at": "2025-07-27T09:15:00Z"
  }
]
```

#### GET `/api/conversations/messages`

Fetches all messages from a specific conversation ID.

**Request Body:**

```json
{
  "conversationId": 123
}
```

**Response:**

```json
[
  {
    "id": 1,
    "created_at": "2025-07-28T10:00:00Z",
    "user_id": 42,
    "sender": "user",
    "content": "Hey, can you help me plan a trip?",
    "conversation_id": 123
  },
  {
    "id": 2,
    "created_at": "2025-07-28T10:00:05Z",
    "user_id": 42,
    "sender": "assistant",
    "content": "Of course! Where would you like to go?",
    "conversation_id": 123
  }
]
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
