import IWizScore from "../interfaces/WizScore"

export default class WizScore implements IWizScore {
    total: number

    constructor() {
        this.total = 0
    }
    static max(scores: WizScore[]) {
        const scoreNumbers = scores.map((score) => {
            return score.total
        })
        const maxScore = scoreNumbers.reduce((a,b) => {
            return Math.max(a,b)
        })
        return maxScore
    }
}