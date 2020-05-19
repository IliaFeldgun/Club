import { redisClient } from "./redis"
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
}