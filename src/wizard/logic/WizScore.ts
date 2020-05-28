import WizGameRules from "./WizGameRules"
import IWizBet from "../models/WizBet"
import IWizPlayerRoundResult from "../models/WizPlayerRoundResult"
import IWizScore from "../models/WizScore"

export default class WizScore implements IWizScore {
    total: number

    constructor() {
        this.total = 0
    }

    calculateScore(bet: IWizBet, playerResult: IWizPlayerRoundResult) {
        WizGameRules.calculateScore(this.total, bet.takes, playerResult.successfulTakes)
    }
}