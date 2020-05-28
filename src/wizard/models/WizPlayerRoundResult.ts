import IWizPlayerRoundResult from "../interfaces/WizPlayerRoundResult"

export default class WizPlayerRoundResult implements IWizPlayerRoundResult {
    totalCards: number
    successfulTakes: number
    constructor(totalCards: number) {
        this.totalCards = totalCards
        this.successfulTakes = 0
    }
}