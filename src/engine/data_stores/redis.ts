import redis from "redis"
import logger from '../winston'
// import RedLock from 'redlock'

export const redisClient = newClient()
export const redisPublisher = newPublisherClient()

function newClient() {
    const port = Number.parseInt(process.env.REDIS_PORT, 10)
    const host = process.env.REDIS_HOST
    const password = process.env.REDIS_PASSWORD

    const client = redis.createClient({port, host, password})

    client.on('error', (channel, message) => {
        logger.error("Redis error; ", message)
    })

    logger.info("Redis client successfully connected")
    return client
}
function newPublisherClient() {
    const client = newClient()
    client.config('set', 'notify-keyspace-events', 'EA', (err) => {
        if (err) {
            logger.error("Failed to set Redis notification; ", err)
        }
    });

    logger.info("Redis publisher client successfully connected")
    return client
}
// export let redLock = new RedLock(
//     [redisClient],
//     {
//         driftFactor: 0.1,
//         retryCount: 10,
//         retryDelay: 200,
//         retryJitter: 200
//     }
// )

// redLock.on('clientError', (error) => {
//     // TODO: Log
// })