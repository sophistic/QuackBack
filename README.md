# QuackBack

```
npm run dev
```

# Endpoints
```
 /api/auth/login -> POST{email:string, password:string}
 /api/auth/signup -> POST {email:string, name:string, password:string}
 /api/key/update ->POST {email,openai,gemini,anthropic}
 /api/key/retrieve -> GET {email} : {user_id,openai,gemini,anthropic}
 /health -> GET returns health status and db connection status
 / -> GET returns App live status
```
Backend endpoint LIVE : https://quackback-xwhd.onrender.com/
