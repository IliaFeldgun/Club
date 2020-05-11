import { redisClient } from "./redis"

export default class KeyValueStateStore {
    static set() {
        return redisClient.SET
    }

    static delete() {
        return redisClient.DEL
    }

    static get() {
        return redisClient.GET
    }
}