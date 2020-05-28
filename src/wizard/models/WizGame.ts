import IWizGame from "../interfaces/WizGame"
import IWizScore from "../interfaces/WizScore"
import IRoom from "../../engine/lobby/interfaces/Room"
import IWizRound from "../interfaces/WizRound"

export default class WizGame implements IWizGame {
    id: string
    roomId: IRoom["id"]
    currentRound: number
    currentRoundId: IWizRound["id"]
    playerScores: { [playerId: string]: IWizScore }

    constructor(id: IWizGame["id"], roomId: IRoom["id"]) {
        this.id = id
        this.roomId = roomId
        this.currentRound = 0
        this.currentRoundId = ""
        this.playerScores = {}
    }
}