import store from "../key_value_state_store"
import IPlayer from "./models/Player";
import IRoom from "./models/Room";
import Room from "./logic/Room";

export default class LobbyMaster {
    static async addPlayerToRoom(playerId: IPlayer["id"], roomId: IRoom["id"]): Promise<any> {
        try {
            const room: IRoom = JSON.parse(await store.getAsync()(roomId))
            const player: IPlayer = JSON.parse(await store.getAsync()(playerId))

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
}