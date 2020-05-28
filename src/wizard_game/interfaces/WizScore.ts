import IWizBet from "./WizBet";
import IWizPlayerRoundResult from "./WizPlayerRoundResult";

export default interface IWizScore {
    total: number

    calculateScore: (bet: IWizBet, playerResult: IWizPlayerRoundResult) => void
}