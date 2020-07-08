import redis from "redis"
import logger from '../winston'
// import RedLock from 'redlock'

export const redisClient = newClient("Game Redis client")
export const redisPublisher = newPublisherClient("Announcer Redis client")
export const redisSessionClient = newClient("Session Redis client")
function newClient(clientName: string) {
    const port = Number.parseInt(process.env.REDIS_PORT, 10)
    const host = process.env.REDIS_HOST
    const password = process.env.REDIS_PASSWORD

    const client = redis.createClient({port, host, password})

    client.on('error', (channel, message) => {
        logger.error(`${clientName} error; `, message)
    })

    logger.info(`${clientName} successfully connected`)
    return client
}
function newPublisherClient(clientName: string) {
    const client = newClient(clientName)
    client.config('set', 'notify-keyspace-events', 'EA', (err) => {
        if (err) {
            logger.error("Failed to set Redis notification; ", err)
        }
    });

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
//
// })