import redis from "redis"
// import RedLock from 'redlock'

export const redisClient = newClient()
export const redisPublisher = newPublisherClient()

function newClient() {
    const client = redis.createClient({
        port: Number.parseInt(process.env.REDIS_PORT, 10),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    })

    client.on('error', (error) => {
        // TODO: Log
    })

    return client
}
function newPublisherClient() {
    const client = newClient()
    // client.config('get', 'notify-keyspace-events', function(err, success) {
    //     if (err) {
    //         // TODO: Handle, Log
    //     }
    //     if (!success) {
    // TODO: For some reason Es doesn't work, need to investigate
    client.config('set', 'notify-keyspace-events', 'EA', (err) => {
        if (err) {
            // TODO: Handle, Log
        }
    });
    //     }
    // });
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