interface IRoom {
    id: string
    leader: IPlayer["id"]
    players: IPlayer["id"][]
    // addPlayer: (player: IPlayer) => void
    // removePlayer: (player: IPlayer) => void
    // close: () => void
}