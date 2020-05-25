import IWizScore from "./WizScore";
import IWizRound from "./WizRound";
import IRoom from "../../engine/lobby_logic/models/Room";

export default interface IWizGame {
    id: string
    roomId: IRoom["id"]
    currentRound: number
    currentRoundId: IWizRound["id"]
    playerScores: { [playerId: string]: IWizScore }
}