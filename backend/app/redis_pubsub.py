import redis.asyncio as redis

import os
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")

r = redis.Redis(host=REDIS_HOST, port=6379)

async def redis_publish(room: str, message: str):
    await r.publish(room, message)

async def redis_subscribe(room: str, websocket):
    pubsub = r.pubsub()
    await pubsub.subscribe(room)
    async for msg in pubsub.listen():
        if msg["type"] == "message":
            await websocket.send_text(msg["data"].decode())
