import redis from "redis"
export let redisClient = redis.createClient({
    port: Number.parseInt(process.env.REDIS_PORT, 10),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
})
redisClient.on('error', (error) => {
    // TODO: Log
})