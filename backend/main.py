from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.auth import auth_router
from app.websocket import websocket_endpoint

app = FastAPI()

# ✅ Health check
@app.get("/")
def root():
    return {"message": "ok"}

@app.get("/ping")
def ping():
    return {"status": "ok"}

# ✅ Serve the chat UI
app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(auth_router)
app.add_api_websocket_route("/ws/{room_id}", websocket_endpoint)
