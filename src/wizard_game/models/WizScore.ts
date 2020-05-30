import WizGameRules from "../WizGameRules"
import IWizBet from "../interfaces/WizBet"
import IWizPlayerRoundResult from "../interfaces/WizPlayerRoundResult"
import IWizScore from "../interfaces/WizScore"

export default class WizScore implements IWizScore {
    total: number

    constructor() {
        this.total = 0
    }
}