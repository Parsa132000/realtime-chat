import time
import redis.asyncio as redis
import os

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
r = redis.Redis(host=REDIS_HOST)

RATE_LIMIT = 5  # max messages
INTERVAL = 10   # seconds

async def check_rate_limit(user: str):
    key = f"rate:{user}"
    now = int(time.time())

    await r.zremrangebyscore(key, 0, now - INTERVAL)  # clean old timestamps
    count = await r.zcard(key)  # count recent

    if count >= RATE_LIMIT:
        return False

    await r.zadd(key, {str(now): now})
    await r.expire(key, INTERVAL)
    return True
