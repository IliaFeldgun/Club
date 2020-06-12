import IRoom from "./interfaces/Room";

export default class LobbyInfo {
    static isGameInProgress(room: IRoom): boolean {
        return room.gameId && room.gameName && true
    }
}