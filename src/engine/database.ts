import MongoDBClient from './mongodb'

const DB_NAME = process.env.MONGODB_DB

export default class Database {
    private static async getCollectionByName(collectionName: string) {
        const mongoClient = (await MongoDBClient.getClient())
        if (mongoClient) {
            const db = mongoClient.db(DB_NAME)
            if (db) {
                return db.collection(collectionName)
            }
            else {
                // TODO: handle
                return undefined
            }
        }
        else {
            // TODO: handle
            return undefined
        }
    }
    static async get(collectionName: string, field: string, value: string) {
        const collection = await Database.getCollectionByName(collectionName)

        const filter: any = {}
        filter[field] = value
        try {
            return await collection.findOne(filter)
        }
        catch {
            // TODO: handle
        }
    }
    static async insert(collectionName: string, object: any): Promise<boolean> {
        const collection = await Database.getCollectionByName(collectionName)
        const result = await collection.insertOne(object)
        if (result.insertedCount === 1) {
            return true
        }
        else {
            return false
        }
    }
    static async replace(collectionName: string, idToReplace: string, object: any):
        Promise<boolean> {
        const collection = await Database.getCollectionByName(collectionName)
        const result = await collection.replaceOne({idToReplace}, object)
        if (result.modifiedCount === 1) {
            return true
        }
        else {
            return false
        }

    }
    static async update(collectionName: string, idToUpdate: string, field: string, value: string):
        Promise<boolean> {
            const collection = await Database.getCollectionByName(collectionName)
            const update: any = {}
            update[field] = value
            const result = await collection.updateOne({idToUpdate},update)
            if (result.modifiedCount === 1) {
                return true
            }
            else {
                return false
            }
    }
    static async pushToArray(collectionName: string, idToUpdate: string, arrayName: string, value: string):
        Promise<boolean> {
            const collection = await Database.getCollectionByName(collectionName)
            const toPush: any = {}
            toPush[arrayName] = value
            const result  = await collection.updateOne({idToUpdate}, {$push: toPush})
            if (result.modifiedCount === 1) {
                return true
            }
            else {
                return false
            }
    }
    static async pullFromArray(collectionName: string, idToUpdate: string, arrayName: string, value: string):
        Promise<boolean> {
            const collection = await Database.getCollectionByName(collectionName)
            const toPull: any = {}
            toPull[arrayName] = value
            const result = await collection.updateOne({idToUpdate}, {$pull: {toPull}})
            if (result.modifiedCount === 1) {
                return true
            }
            else {
                return false
            }

        }
}