from fastapi import FastAPI
from app.auth import auth_router
from app.websocket import websocket_endpoint
from fastapi.staticfiles import StaticFiles
app = FastAPI()



app = FastAPI()

app.mount("/static", StaticFiles(directory="app/static"), name="static")


app.include_router(auth_router)
app.add_api_websocket_route("/ws/{room_id}", websocket_endpoint)