import store from "../key_value_state_store"
import { generateId } from "../id_generator";
import IPlayer from "./models/Player";
import Player from "./logic/Player";
import IRoom from "./models/Room";
import Room from "./logic/Room";

export default class LobbyBuilder {
    static async createPlayer(playerName: string): Promise<IPlayer["id"]>{
        const playerId = generateId(playerName, process.env.UUID_PLAYER_NAMESPACE)

        const player : IPlayer = new Player(playerId, playerName)

        try {
            const storeResponse = await store.setAsync()(player.id, JSON.stringify(player))
            return (playerId)
        }
        catch (error) {
            return error
        }
    }
    static async createRoom(playerId: IPlayer["id"]): Promise<IRoom["id"]> {
        const roomId = generateId(playerId, process.env.UUID_ROOM_NAMESPACE)

        const room: IRoom = new Room(roomId, playerId)
        room.players = [... room.players, playerId]

        try {
            const storeResponse = await store.setAsync()(room.id, JSON.stringify(room))
            return (roomId)
        }
        catch(error) {
            return error
        }
    }
}