import { calculateScore } from "../models/GameRules"

export class WizScore implements IWizScore {
    total: number

    constructor() {
        this.total = 0
    }

    calculateScore(bet: IWizBet, playerResult: IWizPlayerRoundResult) {
        calculateScore(this.total, bet.takes, playerResult.successfulTakes)
    }
}