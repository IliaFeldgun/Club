import IDeck from "../../card_logic/models/Deck"
import IStack from "../../card_logic/models/Stack"
import IWizGame from "../models/WizGame"
import IWizScore from "../models/WizScore"
import IWizBet from "../models/WizBet"
import IWizPlayerRoundResult from "../models/WizPlayerRoundResult"
import IRoom from "../../engine/room_logic/models/Room"

export default class WizGame implements IWizGame {
    id: string
    roomId: IRoom["id"]
    deck: IDeck
    tableStack: IStack
    playerHands: { [playerId: string]: IStack }
    playerBets: { [playerId: string] : IWizBet }
    playerScores: { [playerId: string] : IWizScore }
    playerRoundResults: { [playerId: string] : IWizPlayerRoundResult }

    constructor(id: IWizGame["id"], roomId: IRoom["id"], deck: IDeck, tableStack: IStack) {
        this.id = id
        this.roomId = roomId
        this.deck = deck
        this.tableStack = tableStack
        this.playerHands = {}
        this.playerBets = {}
        this.playerScores = {}
        this.playerRoundResults = {}
    }
}