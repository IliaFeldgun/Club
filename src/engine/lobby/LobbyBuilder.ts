import { generateId } from "../id_generator";
import IPlayer from "./interfaces/Player";
import Player from "./models/Player";
import IRoom from "./interfaces/Room";
import Room from "./models/Room";
import LobbyStore from "./LobbyStore";

export default class LobbyBuilder {
    static async createPlayer(playerName: string): Promise<IPlayer["id"]> {
        // TODO: Look out for injection, ID generation currently prevents it
        const playerId = generateId(playerName, process.env.UUID_PLAYER_NAMESPACE)

        if (await LobbyStore.getPlayer(playerId))
            return playerId
        else {
            const player: IPlayer = new Player(playerId, playerName)
            if (await LobbyStore.setPlayer(player))
                return playerId
        }
    }
    static async createRoom(playerId: IPlayer["id"]): Promise<IRoom["id"]> {
        // TODO: Look out for injection, ID generation currently prevents it
        const roomId = generateId(playerId + Date.now, process.env.UUID_ROOM_NAMESPACE)

        const room: IRoom = new Room(roomId, playerId)

        if (await LobbyStore.setRoom(room))
            return roomId
    }
}