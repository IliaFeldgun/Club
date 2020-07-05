import IRoom from "../interfaces/Room"
import IPlayer from "../interfaces/Player"

export default class Room implements IRoom {
    id: string
    leader: IPlayer["id"]
    players: IPlayer["id"][]
    // TODO: Create a model for games
    gameName: string
    gameId: string
    isPublic: boolean
    constructor(id: string, leader: IPlayer["id"]) {
        this.id = id
        this.leader = leader
        this.players = []
        this.isPublic = false
    }

    /*
    addPlayer(player: IPlayer["id"]) {
        this.players.push(player)
    }
    removePlayer(player: IPlayer) {
        this.players = this.players.filter(p => p.id !== player.id)
    }

    close() {
        this.players = []
    }*/
}