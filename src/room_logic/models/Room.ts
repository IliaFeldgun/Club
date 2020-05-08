interface IRoom {
    id: string
    players: IPlayer[]
    addPlayer: (player: IPlayer) => void
    removePlayer: (player: IPlayer) => void
    close: () => void
}