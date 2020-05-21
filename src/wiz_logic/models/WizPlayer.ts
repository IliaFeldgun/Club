import IStack from "../../card_logic/models/Stack";
import IWizScore from "./WizScore";
import IWizPlayerRoundResult from "./WizPlayerRoundResult";
import IWizBet from "./WizBet";
import IPlayer from "../../engine/lobby_logic/models/Player";

export default interface IWizPlayer extends IPlayer {
    stack: IStack
    score: IWizScore
    currentRoundResult: IWizPlayerRoundResult
    currentBet: IWizBet
}