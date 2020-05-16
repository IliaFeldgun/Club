import IDeck from "../../card_logic/models/Deck";
import IStack from "../../card_logic/models/Stack";
import IWizBet from "./WizBet";
import IWizScore from "./WizScore";
import IWizPlayerRoundResult from "./WizPlayerRoundResult";

export default interface IWizGame {
    id: string
    deck: IDeck
    tableStack: IStack
    playerHands: { [playerId: string]: IStack }
    playerBets: { [playerId: string] : IWizBet }
    playerScores: { [playerId: string] : IWizScore }
    playerRoundResults: { [playerId: string] : IWizPlayerRoundResult }
}