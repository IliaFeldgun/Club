import IWizGame from "../interfaces/WizGame"
import IWizScore from "../interfaces/WizScore"
import IRoom from "../../engine/lobby/interfaces/Room"
import IWizRound from "../interfaces/WizRound"
import IPlayer from "../../engine/lobby/interfaces/Player"
import IWizAnnouncement from "../interfaces/WizAnnouncement"

export default class WizGame implements IWizGame {
    id: string
    roomId: IRoom["id"]
    playerOrder: IPlayer["id"][]
    isDone: boolean
    playerScores: { [playerId: string]: IWizScore }
    currentRound: IWizRound
    announcement: IWizAnnouncement

    constructor(id: IWizGame["id"], roomId: IRoom["id"]) {
        this.id = id
        this.roomId = roomId
        this.playerOrder = []
        this.isDone = false
        this.playerScores = {}
    }
}