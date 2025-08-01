# 🥆 QuackBack API Documentation

## Getting Started

To start the development server:

```bash
npm run dev
```

---

## ✅ API Endpoints

---

### 🔐 Auth

#### POST `/api/auth/login`

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

- **Success:** `201 Created`

```json
{ "message": true }
```

- **Failure:** `400 Bad Request`

```json
{ "message": false }
```

---

#### POST `/api/auth/signup`

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

- **Success:** `201 Created`

```json
{ "message": true }
```

- **Failure:** `400 Bad Request`

```json
{ "message": false }
```

---

### 🔑 API Keys

#### POST `/api/key/update`

Updates a user's API keys.

**Request Body:**

```json
{
  "email": "string",
  "openai": "string",
  "gemini": "string",
  "anthropic": "string"
}
```

**Response:**

- **Success:** `201 Created`

```json
{ "message": true }
```

- **Failure:** `400 Bad Request`

```json
{ "message": false }
```

- **Error:** `500 Internal Server Error`

```json
{ "message": "error details" }
```

---

#### GET `/api/key/retrieve?email=example@example.com`

Retrieves a user's stored API keys.

**Response:**

- **Success:** `201 Created`

```json
{
  "user_id": "string",
  "openai": "string",
  "gemini": "string",
  "anthropic": "string"
}
```

- **Failure:** `400 Bad Request`

```json
{ "message": false }
```

- **Error:** `500 Internal Server Error`

```json
{ "message": "error details" }
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
  "messageHistory": "Previous conversation as string",
  "notes": ["optional user context note 1", "note 2"],
  "agentId": 1,
  "agentContext": "string context for agent"
}
```

**Response:**

```json
{
  "userMessage": {
    "content": "Your prompt",
    "user_id": "number",
    "sender": "user",
    "conversation_id": "number"
  },
  "aiMessage": {
    "content": "Generated response",
    "user_id": "number",
    "sender": "Assisstant",
    "conversation_id": "number"
  },
  "conversationId": "number",
  "aiResponse": "Generated response"
}
```

---

### 📒 Conversations

#### GET `/api/conversations/title`

Fetches all conversation titles associated with a user's email.

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
    "agent_id": 1,
    "updated_at": "2025-07-28T10:30:00Z"
  }
]
```

---

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
  }
]
```

---

### 📓 Notes

#### GET `/api/notes/all?email=user@example.com`

Fetches all stored notes for a specific user.

**Response:**

```json
{
  "user_id": "number",
  "user_context": [
    "Note 1",
    "Note 2"
  ]
}
```

---

#### POST `/api/notes/update`

Replaces all notes for the user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "notes": [
    "new note 1",
    "new note 2"
  ]
}
```

**Response:**

```json
{
  "user_id": "number",
  "user_context": [
    "new note 1",
    "new note 2"
  ]
}
```

---

### ⬆️ Update Paths

#### POST `/api/update/name`

Updates a user's display name.

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "New Name"
}
```

**Response:**

```json
{ "message": true }
```

---

### 💡 Agent Management

#### POST `/api/agent/create`

Creates a new AI agent.

**Request Body:**

```json
{
  "email": "user@example.com",
  "agentName": "Travel Bot",
  "agentTask": "Help plan travel itineraries",
  "provider": "openai",
  "modelName": "gpt-4",
  "apiKey": "user-openai-key"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "Travel Bot",
  "context": "System prompt generated...",
  "user_id": "abc123",
  "created_at": "2025-07-30T10:00:00Z"
}
```

---

#### GET `/api/agent/fetch`

Fetches all agents for the user.

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
    "id": 1,
    "name": "Travel Bot",
    "context": "System prompt generated...",
    "user_id": "abc123",
    "created_at": "2025-07-30T10:00:00Z"
  }
]
```

---

#### POST `/api/agent/delete`

Deletes an agent by ID.

**Request Body:**

```json
{
  "agentId": 1
}
```

**Response:**

```json
{ "message": true }
```

---

### 🌐 Health Check

#### GET `/health`

Checks if the server and DB are healthy.

**Response:**

```json
{ "message": "Healthy" }
```

---

### 🌎 Root

#### GET `/`

Returns app live status.

**Response:**

```json
{ "message": "App is Live" }
```

---

### 🌐 Backend Live URL

[https://quackback-xwhd.onrender.com/](https://quackback-xwhd.onrender.com/)
