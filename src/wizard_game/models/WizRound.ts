import IWizRound from "../interfaces/WizRound";
import IDeck from "../../card_engine/interfaces/Deck";
import IStack from "../../card_engine/interfaces/Stack";
import IWizBet from "../interfaces/WizBet";
import IPlayer from "../../engine/lobby/interfaces/Player";
import IWizPlayerRoundResult from "../interfaces/WizPlayerRoundResult";
import ICard, { Suit } from "../../card_engine/interfaces/Card";
import { PossibleMoves } from "../enums/PossibleMoves";

export default class WizRound implements IWizRound {
    roundNumber: number
    turnNumber: number
    nextMove: PossibleMoves
    deck: IDeck
    strongSuit: Suit
    tableStack: IStack
    playerOrder: IPlayer["id"][]
    playerHands: { [playerId: string]: ICard[] }
    playerBets: { [playerId: string]: IWizBet }
    playerResults: { [playerId: string]: IWizPlayerRoundResult}

    constructor(
        roundNumber: number,
        deck: IDeck,
        tableStack: IStack
    ) {
        this.roundNumber = roundNumber
        this.turnNumber = 1
        this.deck = deck
        this.tableStack = tableStack
        this.playerOrder = []
        this.playerHands = {}
        this.playerBets = {}
        this.playerResults = {}

    }
}