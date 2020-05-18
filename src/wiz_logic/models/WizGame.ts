import IWizScore from "./WizScore";
import IWizRound from "./WizRound";

export default interface IWizGame {
    id: string
    currentRound: number
    currentRoundId: IWizRound["id"]
    playerScores: { [playerId: string]: IWizScore }
}