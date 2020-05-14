export default class Room implements IRoom {
    id: string
    leader: IPlayer["id"]
    players: IPlayer["id"][]
    constructor(id: string, leader: IPlayer["id"]) {
        this.id = id
        this.leader = leader
        this.players = []
    }

    /*addPlayer(player: IPlayer) {
        this.players.push(player)
    }
    removePlayer(player: IPlayer) {
        this.players = this.players.filter(p => p.id !== player.id)
    }

    close() {
        this.players = []
    }*/
}