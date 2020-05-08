class WizPlayerRoundResult implements IWizPlayerRoundResult {
    totalCards: number
    successfulTakes: number
    constructor(totalCards: number) {
        this.totalCards = totalCards
        this.successfulTakes = 0
    }

    addTake() {
        this.successfulTakes++
    }
}