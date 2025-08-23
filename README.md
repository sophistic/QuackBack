# 🧆 KowlBack API Documentation

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

```json
{
  "message": true | false
}
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

```json
{
  "message": true | false
}
```

---

### 🔑 API Keys

#### POST `/api/key/update`

Store or rotate a single provider key in your global pool.

* **Request Body:**

  ```json
  {
    "provider": "gemini" | "claude" | "openai",
    "apiKey": "your-new-api-key"
  }
  ```

* **Response:**

```json
{
  "message": true
}
```

* **Errors:**

  * `400` if `provider` or `apiKey` is missing.
  * `500` on internal failure.

---

#### POST `/api/key/retrieve`

Fetch all active keys for a given provider.

* **Query Parameter:**

  ```
  ?provider=gemini
  ```
* **Response:**
  Returns an array of stored `{ id, provider, api_key, created_at, rotated_at }` records.

  ```json
  [
    {
      "id": 1,
      "provider": "gemini",
      "api_key": "AlzaSyCHu3lu_s2gno2skXWVD8mJCalx",
      "created_at": "2025-07-28T18:40:47.206Z",
      "updated_at":"2025-07-28T18:40:47.206Z",
      "active": true
      },
    {
      "id": 2,
      "provider": "gemini",
      "api_key": "another-active-key",
      "created_at": "2025-08-01T09:12:30.451Z",
      "updated_at":"2025-07-28T18:40:47.206Z",
      "active": true
    }
  ]
  ```
* **Errors:**

  * `400` if `provider` is missing.
  * `500` on internal failure.

---

#### POST `/api/key/toggle`

Enable or disable a specific API key.

* **Request Body:**

  ```json
  {
    "key_id": 1,
    "val": true
  }
  ```

* **Response:**

  ```json
  {
    "message": true | false
  }
  ```

- **Errors:**

  * `400` if the update fails.
  * `500` on internal failure.

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
    "sender": "assistant",
    "conversation_id": "number"
  },
  "conversationId": "number",
  "aiResponse": "Generated response"
}
```

---

### 📒 Conversations

#### POST `/api/conversations/title`

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

#### POST `/api/conversations/messages`

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

### 📓 Notes

#### GET `/api/notes/all?email=user@example.com`

**Response:**

```json
{
  "message": true | false,
  "data": {
    "user_id": "number",
    "user_context": [
      "Note 1",
      "Note 2"
    ]
  }
}
```

---

#### POST `/api/notes/update`

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
  "message": true | false,
  "data": {
    "user_id": "number",
    "user_context": [
      "new note 1",
      "new note 2"
    ]
  }
}
```

---

### ⬆️ Update Paths

#### POST `/api/update/name`

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "New Name"
}
```

**Response:**

```json
{
  "message": true | false
}
```

#### Get User Name

#### POST `/api/update/get-name`

**Request Body:**

```json
{
  "email": "user@example.com",
}
```

**Response:**

```json
{
  "name": "xyzbro"
}
```
---

### 💡 Agent Management

#### POST `/api/agent/create`

**Request Body:**

```json
{
  "email": "user@example.com",
  "agentName": "Travel Bot",
  "agentTask": "Help plan travel itineraries",
  "provider": "openai",
  "modelName": "gpt-4",
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

**Request Body:**

```json
{
  "agentId": 1
}
```

**Response:**

```json
{
  "message": true | false
}
```

---

### 🌐 Health Check

#### GET `/health`

**Response:**

```json
{
  "message": "Healthy"
}
```

---

### 🌎 Root

#### GET `/`

Returns app live status.

**Response:**

```json
{
  "message": "App is Live"
}
```

---

### 🌐 Backend Live URL

**[https://quackback-xwhd.onrender.com/](https://quackback-xwhd.onrender.com/)**

### Api Management URL

**[https://quack-api-manager.vercel.app/](https://quack-api-manager.vercel.app/)**
