import IWizGame from "../interfaces/WizGame"
import IWizScore from "../interfaces/WizScore"
import IRoom from "../../engine/lobby/interfaces/Room"
import IWizRound from "../interfaces/WizRound"
import IPlayer from "../../engine/lobby/interfaces/Player"

export default class WizGame implements IWizGame {
    id: string
    roomId: IRoom["id"]
    currentRound: number
    currentRoundId: IWizRound["id"]
    playerOrder: IPlayer["id"][]
    playerScores: { [playerId: string]: IWizScore }
    isDone: boolean

    constructor(id: IWizGame["id"], roomId: IRoom["id"]) {
        this.id = id
        this.roomId = roomId
        this.currentRound = 0
        this.currentRoundId = ""
        this.playerOrder = []
        this.playerScores = {}
        this.isDone = false
    }
}