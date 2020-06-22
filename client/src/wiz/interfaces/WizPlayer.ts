import IPlayer from "../../engine/interfaces/Player";

export default interface IWizPlayer {
    id: IPlayer["id"]
    name: IPlayer["name"]
    score: number
    takes: number
    handSize: number
    bet: number
}