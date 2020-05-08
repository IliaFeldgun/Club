class Player implements IPlayer {
    id: string
    name: string
    roomId: string
    constructor (name: string, roomId: string) {
        this.name = name
        this.roomId = roomId
        this.id = "" // TODO: Generate ID for players
    }
}