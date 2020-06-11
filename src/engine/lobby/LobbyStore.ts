import store from "../key_value_state_store"
import IPlayer from "./interfaces/Player"
import IRoom from "./interfaces/Room"
import Database from "../database"
import collections from "../db_collections_map"

export default class LobbyStore {
    static async getPlayer(playerId: IPlayer["id"]): Promise<IPlayer> {
        return Database.get(collections.PLAYER_COLLECTION, "id", playerId)
    }
    static async setPlayer(playerId: IPlayer["id"], player: IPlayer):
        Promise<boolean> {

        return Database.replace(collections.PLAYER_COLLECTION, playerId, player)
    }
    static async getRoom(roomId: IRoom["id"]): Promise<IRoom> {
        return Database.get(collections.ROOM_COLLECTION, "id", roomId)
    }
    static async setRoom(roomId: IRoom["id"], room: IRoom): Promise<boolean> {
        return Database.replace(collections.ROOM_COLLECTION, roomId, room)
    }
    static async setRoomGame(
        roomId: IRoom["id"], 
        gameId: IRoom["gameId"],
        gameName: IRoom["gameName"]): Promise<boolean> {
            return Database.update(
                collections.ROOM_COLLECTION,
                roomId,
                "gameId",
                gameId
            )
        }
    // static async getRoom(roomId: IRoom["id"]): Promise<IRoom> {
    //     try {
    //         const room: IRoom = JSON.parse(await store.getAsync()(roomId))
    //         return room
    //     }
    //     catch(error) {
    //         // TODO: Log it
    //         return undefined
    //     }
    // }
    // static async setRoom(roomId: IRoom["id"], room: IRoom): Promise<boolean> {
    //     try {
    //         const storeResponse = await store.setAsync()(roomId, JSON.stringify(room))
    //         return true
    //     }
    //     catch(error) {
    //         // TODO: Log it
    //         return false
    //     }
    // }
    // static async getPlayer(playerId: IPlayer["id"]): Promise<IPlayer> {
    //     try {
    //         const player: IPlayer = JSON.parse(await store.getAsync()(playerId))
    //         return player
    //     }
    //     catch(error) {
    //         // TODO: Log it
    //         return undefined
    //     }
    // }
    // static async setPlayer(playerId: IPlayer["id"], player: IPlayer): Promise<boolean> {
    //     try {
    //         const storeResponse = await store.setAsync()(playerId, JSON.stringify(player))
    //         return true
    //     }
    //     catch(error) {
    //         // TODO: Log it
    //         return false
    //     }
    // }
    static async deleteRoom(roomId: IRoom["id"]): Promise<boolean> {
        try {
            const storeResponse = await store.deleteAsync()(roomId)
            // TODO: Maybe remove room from all players
            return true
        }
        catch(error) {
            // TODO: Log it
            return false
        }
    }
    static async deletePlayer(playerId: IPlayer["id"]): Promise<boolean> {
        try {
            const storeResponse = await store.deleteAsync()(playerId)
            // TODO: Maybe remove player from all rooms and close lead rooms
            return true
        }
        catch(error) {
            // TODO: Log it
            return false
        }
    }
    static async setPlayerAndRoom(player: IPlayer, room: IRoom): Promise<boolean> {
        return store.multiple()
        .SET(player.id, JSON.stringify(player))
        .SET(room.id, JSON.stringify(room))
        .EXEC()
    }
    static lock(resourceId: string[]) {
        return store.lock(resourceId)
    }
}