import store from "../key_value_state_store"
import IPlayer from "./interfaces/Player"
import IRoom from "./interfaces/Room"
import Database from "../database"
import collections from "../db_collections_map"

export default class LobbyStore {
    static async getPlayer(playerId: IPlayer["id"]): Promise<IPlayer> {
        const collection = collections.PLAYER_COLLECTION
        const filter = {
            id: playerId
        }
        return Database.get(collection, filter)
    }
    static async setPlayer(player: IPlayer):
        Promise<boolean> {
        const collection = collections.PLAYER_COLLECTION
        const filter = {
            id: player.id
        }
        return Database.upsert(collection, filter, player)
    }
    static async getRoom(roomId: IRoom["id"]): Promise<IRoom> {
        const collection = collections.ROOM_COLLECTION
        const filter = {
            id: roomId
        }
        return Database.get(collection, filter)
    }
    static async setRoom(room: IRoom): Promise<boolean> {
        const collection = collections.ROOM_COLLECTION
        const filter = {
            id: room.id
        }
        return Database.upsert(collection, filter, room)
    }
    static async setRoomGame(
        roomId: IRoom["id"], 
        gameId: IRoom["gameId"],
        gameName: IRoom["gameName"]): Promise<boolean> {
            const collection = collections.ROOM_COLLECTION
            const updateValue = {
                gameId, gameName
            }
            return Database.update(collection, roomId, updateValue)
    }
    static async setRoomLeader(roomId: IRoom["id"], playerId: IPlayer["id"]):
        Promise<boolean> {
            const collection = collections.ROOM_COLLECTION
            const updateValue = {
                leader: playerId
            }
            return Database.update(collection, roomId, updateValue)
        }
    /// TODO: These two need to be a single transaction
    static async setRoomPlayers(roomId: IRoom["id"], playerIds: IPlayer["id"][]):
        Promise<boolean> {
        const collection = collections.ROOM_COLLECTION
        return Database.pushToArray(collection, roomId, "players", playerIds)
    }
    static async setPlayerRooms(playerId: IPlayer["id"], roomIds: IRoom["id"][]):
        Promise<boolean> {
        const collection = collections.PLAYER_COLLECTION
        return Database.pushToArray(collection, playerId, "rooms", roomIds)
    }
    static async removeRoomPlayer(roomId: IRoom["id"], playerId: IPlayer["id"]):
        Promise<boolean> {
        const collection = collections.ROOM_COLLECTION
        return Database.pullFromArray(collection, roomId, "players", playerId)
    }
    static async removePlayerRoom(playerId: IPlayer["id"], roomId: IRoom["id"]):
        Promise<boolean> {
        const collection = collections.PLAYER_COLLECTION
        return Database.pullFromArray(collection, playerId, "rooms", roomId)

    }
    static async deletePlayer(playerId: IPlayer["id"]): Promise<boolean> {
        const collection = collections.PLAYER_COLLECTION
        const filter = {
            id: playerId
        }
        return Database.delete(collection, filter)
    }
    static async deleteRoom(roomId: IRoom["id"]): Promise<boolean> {
        const collection = collections.ROOM_COLLECTION
        const filter = {
            id: roomId
        }
        return Database.delete(collection, filter)
    }

    // static async setPlayerAndRoom(player: IPlayer, room: IRoom): Promise<boolean> {

    // }
}