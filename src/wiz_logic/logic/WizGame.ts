import IWizGame from "../models/WizGame"
import IWizScore from "../models/WizScore"
import IRoom from "../../engine/lobby/models/Room"
import IWizRound from "../models/WizRound"

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