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
    static async get(collectionName: string, filterObject: any): Promise<any> {
        const collection = await Database.getCollectionByName(collectionName)

        try {
            return await collection.findOne(filterObject)
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
    static async upsert(collectionName: string, filter: any, object: any): Promise<boolean> {
        const collection = await Database.getCollectionByName(collectionName)
        const result = await collection.updateOne(filter, {$set: object}, {upsert: true})
        if (result.result.ok === 1) {
            return true
        }
        else {
            return false
        }

    }
    static async replace(collectionName: string, idToReplace: string, object: any):
        Promise<boolean> {
        const collection = await Database.getCollectionByName(collectionName)
        const result = await collection.replaceOne({id: idToReplace}, object)
        if (result.modifiedCount === 1) {
            return true
        }
        else {
            return false
        }

    }
    static async update(collectionName: string, idToUpdate: string, object: any):
        Promise<boolean> {
        const collection = await Database.getCollectionByName(collectionName)
        const result = await collection.updateOne({id: idToUpdate}, {$set: object})
        if (result.modifiedCount === 1) {
            return true
        }
        else {
            return false
        }
    }
    static async delete(collectionName: string, filter: any): Promise<boolean> {
        const collection = await Database.getCollectionByName(collectionName)
        const result = await collection.deleteOne(filter)
        if (result.deletedCount === 1) {
            return true
        }
        else {
            return false
        }
    }
    static async pushToArray(collectionName: string, idToUpdate: string, arrayName: string, values: string[]):
        Promise<boolean> {
        const collection = await Database.getCollectionByName(collectionName)
        const toPush: any = {}
        toPush[arrayName] = {$each: values}
        const result  = await collection.updateOne({id: idToUpdate}, {$push: toPush})
        if (result.modifiedCount === 1) {
            return true
        }
        else {
            return false
        }
    }
    static async pullFromArray(
        collectionName: string,
        idToUpdate: string,
        arrayName: string,
        value: string
        ): Promise<boolean> {
        const collection = await Database.getCollectionByName(collectionName)
        const toPull: any = {}
        toPull[arrayName] = value
        const result = await collection.updateOne({id: idToUpdate}, {$pull: {toPull}})
        if (result.modifiedCount === 1) {
            return true
        }
        else {
            return false
        }
    }
}