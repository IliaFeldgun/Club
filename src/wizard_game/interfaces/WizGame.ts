import IWizScore from "./WizScore";
import IWizRound from "./WizRound";
import IRoom from "../../engine/lobby/interfaces/Room";
import IPlayer from "../../engine/lobby/interfaces/Player";
import IWizAnnouncement from "./WizAnnouncement";

export default interface IWizGame {
    id: string
    roomId: IRoom["id"]
    playerOrder: IPlayer["id"][]
    isDone: boolean
    playerScores: { [playerId: string]: IWizScore }
    currentRound: IWizRound
    announcement: IWizAnnouncement
}