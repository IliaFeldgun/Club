import IWizGame from "../interfaces/WizGame"
import IWizScore from "../interfaces/WizScore"
import IRoom from "../../engine/lobby/interfaces/Room"
import IWizRound from "../interfaces/WizRound"
import IPlayer from "../../engine/lobby/interfaces/Player"

export default class WizGame implements IWizGame {
    id: string
    roomId: IRoom["id"]
    currentRound: IWizRound
    playerOrder: IPlayer["id"][]
    playerScores: { [playerId: string]: IWizScore }
    isDone: boolean

    constructor(id: IWizGame["id"], roomId: IRoom["id"]) {
        this.id = id
        this.roomId = roomId
        this.playerOrder = []
        this.playerScores = {}
        this.isDone = false
    }
}