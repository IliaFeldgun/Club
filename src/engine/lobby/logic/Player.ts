import IPlayer from "../models/Player"
import IRoom from "../models/Room"

export default class Player implements IPlayer {
    id: string
    name: string
    rooms: IRoom["id"][]
    constructor (id: string, name: string) {
        this.id = id
        this.name = name
        this.rooms = []
    }
}