import { redisClient, redisPublisher } from "./redis"
import { promisify } from "util"

export default class KeyValueStateStore {
    static setAsync() {
        return promisify(redisClient.SET).bind(redisClient)
    }

    static deleteAsync() {
        return promisify(redisClient.DEL).bind(redisClient)
    }

    static getAsync() {
        return promisify(redisClient.GET).bind(redisClient)
    }
    static subscribe() {
        return promisify(redisPublisher.SUBSCRIBE).bind(redisPublisher)
    }
    static unsubscribe() {
        return promisify(redisPublisher.UNSUBSCRIBE).bind(redisPublisher)
    }
    static onSubscribedMessage(callback: (channel: string, message: string) => void) {
        return redisPublisher.on("message", callback)
    }
    // static multiple() {
    //     return redisClient.MULTI()
    // }
    // static lock(resourceKey: string[]) {
    //     return redLock.lock(resourceKey,1000)
    // }
}