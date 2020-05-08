class Room implements IRoom {
    id : string
    players: IPlayer[]
    deck: IDeck
    constructor() {
        this.players = []
    }

    addPlayer(player: IPlayer) {
        this.players.push(player)
    }
    removePlayer(player: IPlayer) {
        this.players = this.players.filter(p => p.id !== player.id)
    }

    close() {
        this.players = []
    }
}