import IWizRound from "../interfaces/WizRound";
import IWizGame from "../interfaces/WizGame";
import IDeck from "../../card_engine/interfaces/Deck";
import IStack from "../../card_engine/interfaces/Stack";
import IWizBet from "../interfaces/WizBet";
import IPlayer from "../../engine/lobby/interfaces/Player";
import IWizPlayerRoundResult from "../interfaces/WizPlayerRoundResult";
import ICard from "../../card_engine/interfaces/Card";
import { PossibleMoves } from "../enums/PossibleMoves";

export default class WizRound implements IWizRound {
    id: string
    roundNumber: number
    turnNumber: number
    gameId: IWizGame["id"]
    nextMove: PossibleMoves
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