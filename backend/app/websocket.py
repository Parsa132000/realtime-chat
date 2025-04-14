from fastapi import WebSocket, WebSocketDisconnect
from jose import jwt, JWTError
import asyncio
from app.redis_pubsub import redis_publish, redis_subscribe
from app.rate_limiter import check_rate_limit
SECRET_KEY = "supersecret"
ALGORITHM = "HS256"

rooms = {}

async def websocket_endpoint(websocket: WebSocket, room_id: str):
    token = websocket.query_params.get("token")
    if not token:
        await websocket.close(code=1008)
        return

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
    except JWTError:
        await websocket.close(code=1008)
        return

    await websocket.accept()

    # Add connection
    if room_id not in rooms:
        rooms[room_id] = []
    rooms[room_id].append(websocket)

    # Start Redis subscription
    asyncio.create_task(redis_subscribe(room_id, websocket))

    try:
        while True:
            msg = await websocket.receive_text()

            allowed = await check_rate_limit(user_email)
            if not allowed:
                await websocket.send_text("⚠️ Rate limit exceeded. Try again later.")
                continue

            await redis_publish(room_id, f"{user_email}: {msg}")
            
    except WebSocketDisconnect:
        rooms[room_id].remove(websocket)
