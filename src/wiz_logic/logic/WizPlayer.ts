import { WizScore } from "./WizScore"

export class WizPlayer extends Player implements IWizPlayer {
    stack: IStack
    score: IWizScore
    currentBet: IWizBet
    currentRoundResult: IWizPlayerRoundResult

    constructor(name: string, roomId: string) {
        super(name, roomId)

        this.stack = new Stack([])
        this.score = new WizScore()
        this.currentBet = undefined
        this.currentRoundResult = undefined
    }
}