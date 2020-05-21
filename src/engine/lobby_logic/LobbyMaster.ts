import store from "../key_value_state_store"
import IPlayer from "./models/Player";
import IRoom from "./models/Room";

export default class LobbyMaster {
    static async addPlayerToRoom(playerId: IPlayer["id"], roomId: IRoom["id"]): Promise<any> {
        try {
            const room: IRoom = await LobbyMaster.getRoom(roomId)
            const player: IPlayer = await LobbyMaster.getPlayer(playerId)

            player.rooms = player.rooms.concat(roomId)
            room.players = room.players.concat(playerId)

            // TODO: Needs to be a single transaction
            const storeResponse1 = await store.setAsync()(room.id, JSON.stringify(room))
            const storeResponse2 = await store.setAsync()(player.id, JSON.stringify(player))

            return room
        }
        catch (error) {
            return error
        }
    }
    static async removePlayerFromRoom(playerId: IPlayer["id"], roomId: IRoom["id"]): Promise<any> {
        try {
            const room: IRoom = await LobbyMaster.getRoom(roomId)
            const player: IPlayer = await LobbyMaster.getPlayer(playerId)

            player.rooms = player.rooms.filter((room) => room != roomId)
            room.players = room.players.filter((player) => player != playerId)

            // TODO: Needs to be a single transaction
            const storeResponse1 = await store.setAsync()(room.id, JSON.stringify(room))
            const storeResponse2 = await store.setAsync()(player.id, JSON.stringify(player))

            return room
        }
        catch (error) {
            return error
        }
    }
    static async getRoomPlayers(roomId: IRoom["id"]): Promise<IPlayer["id"][]> {
        try {
            const room: IRoom = await LobbyMaster.getRoom(roomId)

            return room.players
        }
        catch (error) {
            return error
        }
    }
    static async getPlayerRooms(playerId: IPlayer["id"]): Promise<IRoom["id"][]> {
        try {
            const player: IPlayer = await LobbyMaster.getPlayer(playerId)

            return player.rooms
        }
        catch (error) {
            return error
        }
    }
    static async deletePlayer(playerId: IPlayer["id"]): Promise<any> {
        try {
            const storeResponse = await store.deleteAsync()(playerId)
            // TODO: Maybe remove player from all rooms and close lead rooms
            return storeResponse
        }
        catch(error) {
            return error
        }
    }
    private static async getRoom(roomId: IRoom["id"]): Promise<IRoom> {
        try {
            const room: IRoom = JSON.parse(await store.getAsync()(roomId))
            return room
        }
        catch(error) {
            return error
        }
    }
    private static async getPlayer(playerId: IPlayer["id"]): Promise<IPlayer> {
        try {
            const player: IPlayer = JSON.parse(await store.getAsync()(playerId))
            return player
        }
        catch(error) {
            return error
        }
    }
}