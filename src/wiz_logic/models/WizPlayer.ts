import IStack from "../../card_logic/models/Stack";
import IWizScore from "./WizScore";
import IWizPlayerRoundResult from "./WizPlayerRoundResult";
import IWizBet from "./WizBet";

export default interface IWizPlayer extends IPlayer {
    stack: IStack
    score: IWizScore
    currentRoundResult: IWizPlayerRoundResult
    currentBet: IWizBet
}