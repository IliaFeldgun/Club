import store from "../key_value_state_store"
import IPlayer from "./models/Player"
import IRoom from "./models/Room"

export default class LobbyStore {

    static async getRoom(roomId: IRoom["id"]): Promise<IRoom> {
        try {
            const room: IRoom = JSON.parse(await store.getAsync()(roomId))
            return room
        }
        catch(error) {
            // TODO: Log it
            return undefined
        }
    }
    static async setRoom(roomId: IRoom["id"], room: IRoom): Promise<boolean> {
        try {
            const storeResponse = await store.setAsync()(roomId, JSON.stringify(room))
            return true
        }
        catch(error) {
            // TODO: Log it
            return false
        }
    }
    static async getPlayer(playerId: IPlayer["id"]): Promise<IPlayer> {
        try {
            const player: IPlayer = JSON.parse(await store.getAsync()(playerId))
            return player
        }
        catch(error) {
            // TODO: Log it
            return undefined
        }
    }
    static async setPlayer(playerId: IPlayer["id"], player: IPlayer): Promise<boolean> {
        try {
            const storeResponse = await store.setAsync()(playerId, JSON.stringify(player))
            return true
        }
        catch(error) {
            // TODO: Log it
            return false
        }
    }
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
}