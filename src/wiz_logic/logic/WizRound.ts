import IWizRound from "../models/WizRound";
import IWizGame from "../models/WizGame";
import IDeck from "../../card_logic/models/Deck";
import IStack from "../../card_logic/models/Stack";
import IWizBet from "../models/WizBet";
import IPlayer from "../../engine/lobby/interfaces/Player";
import IWizPlayerRoundResult from "../models/WizPlayerRoundResult";
import ICard from "../../card_logic/models/Card";

export default class WizRound implements IWizRound {
    id: string
    roundNumber: number
    turnNumber: number
    gameId: IWizGame["id"]
    deck: IDeck
    tableStack: IStack
    playerOrder: IPlayer["id"][]
    playerHands: { [playerId: string]: ICard[] }
    playerBets: { [playerId: string]: IWizBet }
    playerResults: { [playerId: string]: IWizPlayerRoundResult}

    constructor(id: string, gameId: IWizGame["id"], roundNumber: number,
                deck: IDeck, tableStack: IStack) {
        this.id = id
        this.roundNumber = roundNumber
        this.turnNumber = 1
        this.gameId = gameId
        this.deck = deck
        this.tableStack = tableStack
        this.playerOrder = []
        this.playerHands = {}
        this.playerBets = {}
        this.playerResults = {}

    }
}