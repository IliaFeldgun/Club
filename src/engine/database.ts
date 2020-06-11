import MongoDBClient from './mongodb'

const DB_NAME = process.env.MONGODB_DB

export default class Database {
    static async insert(collectionName: string, object: any): Promise<boolean> {
        const mongoClient = (await MongoDBClient.getClient())
        const collection = mongoClient.db(DB_NAME).collection(collectionName)
        const result = await collection.insertOne(object)
        if (result.insertedCount === 1) {
            return true
        }
        else {
            return false
        }
    }
    static async replace(collectionName: string, id: string, object: any):
        Promise<boolean> {
        const mongoClient = (await MongoDBClient.getClient())
        const collection = mongoClient.db(DB_NAME).collection(collectionName)
        const result = await collection.replaceOne({id}, object)
        if (result.modifiedCount === 1) {
            return true
        }
        else {
            return false
        }

    }
    static async get(collectionName: string, field: string, value: string) {
        const mongoClient = (await MongoDBClient.getClient())
        const collection = mongoClient.db(DB_NAME).collection(collectionName)

        const filter: any = {}
        filter[field] = value
        try {
            return await collection.findOne(filter)
        }
        catch {
            // TODO: handle
        }
    }
}