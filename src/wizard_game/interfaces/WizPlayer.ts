import IStack from "../../card_engine/interfaces/Stack";
import IWizScore from "./WizScore";
import IWizPlayerRoundResult from "./WizPlayerRoundResult";
import IWizBet from "./WizBet";
import IPlayer from "../../engine/lobby/interfaces/Player";

export default interface IWizPlayer extends IPlayer {
    stack: IStack
    score: IWizScore
    currentRoundResult: IWizPlayerRoundResult
    currentBet: IWizBet
}