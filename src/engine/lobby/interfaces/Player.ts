import IRoom from "./Room"

export default interface IPlayer {
    id: string
    name: string
    rooms: IRoom["id"][]
}