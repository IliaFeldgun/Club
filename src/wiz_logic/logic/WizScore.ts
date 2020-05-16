import { calculateScore } from "./GameRules"
import IWizBet from "../models/WizBet"
import IWizPlayerRoundResult from "../models/WizPlayerRoundResult"
import IWizScore from "../models/WizScore"

export class WizScore implements IWizScore {
    total: number

    constructor() {
        this.total = 0
    }

    calculateScore(bet: IWizBet, playerResult: IWizPlayerRoundResult) {
        calculateScore(this.total, bet.takes, playerResult.successfulTakes)
    }
}