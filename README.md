# 🥆 QuackBack

To start the development server:

```bash
npm run dev
```

---

## ✅ API Endpoints

### 🔐 Auth

* **POST** `/api/auth/login`
  Request Body:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

* **POST** `/api/auth/signup`
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

* **POST** `/api/key/update`
  Request Body:

  ```json
  {
    "email": "string",
    "openai": "string",
    "gemini": "string",
    "anthropic": "string"
  }
  ```

* **GET** `/api/key/retrieve?email=example@example.com`
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

### 🧪 Health Check

* **GET** `/health`
  Returns the health status and DB connection status.

---

### 🚀 Root

* **GET** `/`
  Returns the app live status.

---

### 🌐 Backend Live URL

**[https://quackback-xwhd.onrender.com/](https://quackback-xwhd.onrender.com/)**
