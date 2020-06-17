import { MongoClientOptions, MongoClient} from 'mongodb'

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
            return true
        }
        catch (ex) {
            client.close()
            return false
            // TODO: handle and log
        }
    }
}