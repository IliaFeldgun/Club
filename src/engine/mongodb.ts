import { MongoClientOptions, MongoClient} from 'mongodb'

const mongoOptions: MongoClientOptions = {
    useUnifiedTopology: true
}
const mongoConnString = process.env.MONGODB_CONNECTION_STRING

export default class MongoDBClient {
    private static client: MongoClient = undefined

    public static async getClient() {
        if (!this.client) {
            this.connectClient().then(() => {
                return this.client
            })
        }
        else {
            return this.client
        }
    }
    private static async connectClient() {
        const client = new MongoClient(mongoConnString, mongoOptions)
        try {
            this.client = await client.connect()
        }
        catch (ex) {
            client.close()
            // TODO: handle and log
        }
    }
}