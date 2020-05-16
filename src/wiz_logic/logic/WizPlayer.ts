import { WizScore } from "./WizScore"
import Stack from "../../card_logic/logic/Stack"
import IStack from "../../card_logic/models/Stack"
import IWizScore from "../models/WizScore"
import IWizBet from "../models/WizBet"
import IWizPlayerRoundResult from "../models/WizPlayerRoundResult"
import IWizPlayer from "../models/WizPlayer"

export default class WizPlayer implements IWizPlayer {
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