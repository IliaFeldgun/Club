import IWizGame from "../interfaces/WizGame"
import IWizScore from "../interfaces/WizScore"
import IWizRound from "../interfaces/WizRound"
import IWizAnnouncement from "../interfaces/WizAnnouncement"

import IRoom from "../../engine/lobby/interfaces/Room"
import IPlayer from "../../engine/lobby/interfaces/Player"

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