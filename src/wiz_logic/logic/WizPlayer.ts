import { WizScore } from "./WizScore"
import Stack from "../../card_logic/logic/Stack"

export class WizPlayer implements IWizPlayer {
    id: string
    name: string
    stack: IStack
    score: IWizScore
    currentBet: IWizBet
    currentRoundResult: IWizPlayerRoundResult

    constructor(name: string, roomId: string) {
        this.stack = new Stack([])
        this.score = new WizScore()
        this.currentBet = undefined
        this.currentRoundResult = undefined
    }
}