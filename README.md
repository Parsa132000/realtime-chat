# 💬 Realtime Chat App (FastAPI + WebSockets + Redis)

This is a real-time, multi-user chat application built using **FastAPI**, **WebSockets**, and **Redis Pub/Sub**, fully containerized with Docker and deployable via Render.

### 🧠 Features

- ✅ Realtime WebSocket chat per room
- 🔐 JWT Authentication
- 🚦 Redis-based pub/sub for multi-instance broadcasting
- ⚠️ Rate limiting with Redis sorted sets
- 🌐 Dockerized setup for local & cloud deployment
- 🌈 Simple HTML+JS frontend to test the chat

---

## 🚀 Live Demo

Test it here 👉 [https://your-app-name.onrender.com/static/chat.html](https://your-app-name.onrender.com/static/chat.html)

> Replace with your actual Render URL after deployment.

---

## 🔐 Get Started

### ⏳ Login to Get a Token

Use this endpoint to get a token (via Postman or cURL):

```bash
POST /login
Content-Type: application/x-www-form-urlencoded

username=admin@example.com
password=123456
