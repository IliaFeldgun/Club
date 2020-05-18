import IPlayer from "./Player";

export default interface IRoom {
    id: string
    leader: IPlayer["id"]
    players: IPlayer["id"][]
    addPlayer: (player: IPlayer["id"]) => void
    // removePlayer: (player: IPlayer) => void
    // close: () => void
}