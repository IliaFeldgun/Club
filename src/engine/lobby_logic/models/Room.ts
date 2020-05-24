import IPlayer from "./Player";

export default interface IRoom {
    id: string
    leader: IPlayer["id"]
    players: IPlayer["id"][]
    // TODO: Create a model for games
    gameName: string
    gameId: string
    // addPlayer: (player: IPlayer["id"]) => void
    // removePlayer: (player: IPlayer) => void
    // close: () => void
}