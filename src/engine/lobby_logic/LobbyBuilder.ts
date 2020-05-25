import { generateId } from "../id_generator";
import IPlayer from "./models/Player";
import Player from "./logic/Player";
import IRoom from "./models/Room";
import Room from "./logic/Room";
import LobbyStore from "./LobbyStore";

export default class LobbyBuilder {
    static async createPlayer(playerName: string): Promise<IPlayer["id"]>{
        const playerId = generateId(playerName, process.env.UUID_PLAYER_NAMESPACE)

        const player : IPlayer = new Player(playerId, playerName)

        if (await LobbyStore.setPlayer(playerId, player))
            return playerId
        
    } 
    static async createRoom(playerId: IPlayer["id"]): Promise<IRoom["id"]> {
        const roomId = generateId(playerId, process.env.UUID_ROOM_NAMESPACE)

        const room: IRoom = new Room(roomId, playerId)
        room.players = [... room.players, playerId]

        if (await LobbyStore.setRoom(roomId, room))
            return roomId
    }
}