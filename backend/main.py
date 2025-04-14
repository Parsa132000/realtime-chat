import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from backend.app.auth import auth_router
from backend.app.websocket import websocket_endpoint



app = FastAPI()

# ✅ CORS: Allow your Vercel frontend to access backend APIs
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://realtime-chat-three-lime.vercel.app"],  # 🔁 Replace with your real Vercel domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Static frontend (optional; you can remove this if frontend is fully separate)
frontend_path = os.path.join(os.path.dirname(__file__), "../frontend")
app.mount("/static", StaticFiles(directory=frontend_path), name="static")

# ✅ API + WebSocket routes
app.include_router(auth_router)
app.add_api_websocket_route("/ws/{room_id}", websocket_endpoint)

@app.get("/")
def root():
    return {"message": "ok"}
