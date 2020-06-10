import IPlayer from "./Player";

export default interface IRoom {
    id: string
    leader: IPlayer["id"]
    players: IPlayer["id"][]
    gameName: string
    gameId: string
}