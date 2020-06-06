import redis from "redis"
import RedLock from 'redlock'

export let redisClient = redis.createClient({
    port: Number.parseInt(process.env.REDIS_PORT, 10),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
})
redisClient.on('error', (error) => {
    // TODO: Log
})

export let redLock = new RedLock(
    [redisClient],
    {
        driftFactor: 0.1,
        retryCount: 10,
        retryDelay: 200,
        retryJitter: 200
    }
)

redLock.on('clientError', (error) => {
    // TODO: Log
})