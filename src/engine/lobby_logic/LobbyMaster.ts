import store from "../key_value_state_store"
import IPlayer from "./models/Player";
import IRoom from "./models/Room";

export default class LobbyMaster {
    static async addPlayerToRoom(playerId: IPlayer["id"], roomId: IRoom["id"]): Promise<boolean> {
        try {
            const room: IRoom = await LobbyMaster.getRoom(roomId)
            const player: IPlayer = await LobbyMaster.getPlayer(playerId)

            player.rooms = player.rooms.concat(roomId)
            room.players = room.players.concat(playerId)

            // TODO: Needs to be a single transaction
            const roomDone = await LobbyMaster.setRoom(room.id, room)
            const playerDone = await LobbyMaster.setPlayer(player.id, player)

            return roomDone && playerDone
        }
        catch (error) {
            // TODO: Log it
            return false
        }
    }
    static async removePlayerFromRoom(playerId: IPlayer["id"], roomId: IRoom["id"]): Promise<boolean> {
        try {
            const room: IRoom = await LobbyMaster.getRoom(roomId)
            const player: IPlayer = await LobbyMaster.getPlayer(playerId)

            player.rooms = player.rooms.filter((r) => r !== roomId)
            room.players = room.players.filter((p) => p !== playerId)

            // TODO: Needs to be a single transaction
            const roomDone = await LobbyMaster.setRoom(room.id, room)
            const playerDone = await LobbyMaster.setPlayer(player.id, player)

            return roomDone && playerDone
        }
        catch (error) {
            // TODO: Log it
            return false
        }
    }
    static async getRoomPlayers(roomId: IRoom["id"]): Promise<IPlayer["id"][]> {
        try {
            const room: IRoom = await LobbyMaster.getRoom(roomId)

            return room.players
        }
        catch (error) {
            // TODO: Log it
            return undefined
        }
    }
    static async getRoomLeader(roomId: IRoom["id"]): Promise<IRoom["leader"]> {
        try {
            const room: IRoom = await LobbyMaster.getRoom(roomId)

            return room.leader
        }
        catch (error) {
            // TODO: Log it
            return undefined
        }
    }
    static async setRoomLeader(playerId: IPlayer["id"], roomId: IRoom["id"]): Promise<boolean> {
        try {
            const room: IRoom = await LobbyMaster.getRoom(roomId)
            room.leader = playerId
            const roomDone = await LobbyMaster.setRoom(roomId, room)
            return roomDone
        }
        catch (error) {
            // TODO: Log it
            return false
        }
    }
    static async getPlayerRooms(playerId: IPlayer["id"]): Promise<IRoom["id"][]> {
        try {
            const player: IPlayer = await LobbyMaster.getPlayer(playerId)

            return player.rooms
        }
        catch (error) {
            // TODO: Log it
            return undefined
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
    private static async setRoom(roomId: IRoom["id"], room: IRoom): Promise<boolean> {
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
    private static async setPlayer(playerId: IPlayer["id"], player: IPlayer): Promise<boolean> {
        try {
            const storeResponse = await store.setAsync()(playerId, JSON.stringify(player))
            return true
        }
        catch(error) {
            // TODO: Log it
            return false
        }
    }
    static async getRoomGame(roomId: IRoom["id"]): Promise<IRoom["gameName"]> {
        try {
            const room: IRoom = await LobbyMaster.getRoom(roomId)

            return room.gameName
        }
        catch (error) {
            // TODO: Log it
            return undefined
        }
    }
    static async setRoomGame(roomId: IRoom["id"], game: IRoom["gameName"]): Promise<boolean> {
        try {
            const room: IRoom = await LobbyMaster.getRoom(roomId)
            room.gameName = game
            const roomDone = await LobbyMaster.setRoom(roomId, room)
            return roomDone
        }
        catch (error) {
            // TODO: Log it
            return false
        }
    }
}