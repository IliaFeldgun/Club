import IPlayer from "./interfaces/Player";
import IRoom from "./interfaces/Room";
import LobbyStore from "./LobbyStore";
import LobbyInfo from "./LobbyInfo";

export default class LobbyMaster {
    static async addPlayerToRoom(playerId: IPlayer["id"], roomId: IRoom["id"]): Promise<boolean> {
        const MAX_PLAYERS = 10
        const room: IRoom = await LobbyStore.getRoom(roomId)

        if (LobbyInfo.isGameInProgress(room) || room.players.length >= MAX_PLAYERS) {
            return false
        }
        const playerDone = LobbyStore.setRoomPlayers(roomId, [playerId])
        const roomDone = LobbyStore.setPlayerRooms(playerId, [roomId])

        return await roomDone && await playerDone
    }
    static async removePlayerFromRoom(
        playerId: IPlayer["id"],
        roomId: IRoom["id"]
    ): Promise<boolean> {

        const room: IRoom = await LobbyStore.getRoom(roomId)

        if (LobbyInfo.isGameInProgress(room)) {
            return false
        }

        const playerDone = LobbyStore.removePlayerRoom(playerId, roomId)
        const roomDone = LobbyStore.removeRoomPlayer(roomId, playerId)

        return await roomDone && await playerDone
    }
    static async isPlayerInRoom(playerId: IPlayer["id"], roomId: IRoom["id"]) :
        Promise<boolean> {
        const [roomPlayerIds, playerRoomIds] = await Promise.all([
            LobbyMaster.getRoomPlayerIds(roomId),
            LobbyMaster.getPlayerRoomIds(playerId)
        ])
        const playerInRoom = roomPlayerIds.indexOf(playerId) !== -1
        const roomInPlayer = playerRoomIds.indexOf(roomId) !== -1
        return playerInRoom && roomInPlayer

    }
    static async getRoomPlayerIds(roomId: IRoom["id"]): Promise<IPlayer["id"][]> {
        const room: IRoom = await LobbyStore.getRoom(roomId)
        if (room)
            return room.players
        else {
            return []
        }
    }
    static async getPlayerRoomIds(playerId: IPlayer["id"]): Promise<IRoom["id"][]> {
        const player: IPlayer = await LobbyStore.getPlayer(playerId)
        if (player) {
            return player.rooms
        }
        else {
            return []
        }
    }
    static async getRoomPlayers(roomId: IRoom["id"]): Promise<IPlayer[]> {

        const playerIds = await LobbyMaster.getRoomPlayerIds(roomId)
        if (playerIds) {
            const playerReqs: Promise<IPlayer>[] = []
            playerIds.forEach((id) => {
                playerReqs.push(LobbyStore.getPlayer(id))
            })

            const players = await Promise.all(playerReqs)

            return players
        }
        else {
            return []
        }
    }
    static async getRoomLeader(roomId: IRoom["id"]): Promise<IRoom["leader"]> {
        const room: IRoom = await LobbyStore.getRoom(roomId)
        if (room)
        {
            return room.leader
        }
        else {
            return ""
        }
    }
    static async setRoomLeader(
        playerId: IPlayer["id"],
        roomId: IRoom["id"]
    ): Promise<boolean> {

        return LobbyStore.setRoomLeader(roomId, playerId)
    }
    static async getRoomGame(roomId: IRoom["id"]): Promise<{
        id: IRoom["gameId"],
        name: IRoom["gameName"],
    }> {
        const room: IRoom = await LobbyStore.getRoom(roomId)
        if (room) {
            return {id: room.gameId, name: room.gameName}
        }
        else {
            return undefined
        }
    }
    static async setRoomGame(
        roomId: IRoom["id"],
        gameName: IRoom["gameName"],
        gameId: IRoom["gameId"]
    ): Promise<boolean> {

        return LobbyStore.setRoomGame(roomId, gameId, gameName)
    }
    // static async getRoomGameType(roomId: IRoom["id"]): Promise<IRoom["gameName"]> {
    //     const room: IRoom = await LobbyStore.getRoom(roomId)
    //     if (room){
    //         return room.gameName
    //     }
    //     else {
    //         return ""
    //     }
    // }
    // static async setRoomGameType(roomId: IRoom["id"],
    //                              game: IRoom["gameName"]): Promise<boolean> {
    // }
}