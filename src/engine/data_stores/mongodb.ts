import { MongoClientOptions, MongoClient, MongoError } from 'mongodb'
import logger from '../winston'

const mongoOptions: MongoClientOptions = {
    useUnifiedTopology: true
}
const mongoConnString = process.env.MONGODB_CONNECTION_STRING

export default class MongoDBClient {
    private static client: MongoClient = undefined

    public static async getClient() {
        if (!this.client) {
            if (await this.connectClient()) {
                return this.client
            }
            else {
                return undefined
            }
        }
        else {
            return this.client
        }
    }
    private static async connectClient(): Promise<boolean> {
        const client = new MongoClient(mongoConnString, mongoOptions)
        try {
            this.client = await client.connect()
            logger.info("MongoDB client successfully connected")
            return true
        }
        catch (ex) {
            const exError: MongoError = ex
            client.close()
            logger.error("Failed to connect to mongoDB: ", exError)
            return false
        }
    }
}