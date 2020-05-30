import IWizScore from "./WizScore";
import IWizRound from "./WizRound";
import IRoom from "../../engine/lobby/interfaces/Room";
import IPlayer from "../../engine/lobby/interfaces/Player";

export default interface IWizGame {
    id: string
    roomId: IRoom["id"]
    currentRound: number
    currentRoundId: IWizRound["id"]
    playerOrder: IPlayer["id"][]
    playerScores: { [playerId: string]: IWizScore }
    isDone: boolean
}