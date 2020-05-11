class Player implements IPlayer {
    id: string
    name: string
    constructor (id: string, name: string) {
        this.name = name
        this.id = id // TODO: Generate ID for players
    }
}