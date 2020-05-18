import IWizRound from "../models/WizRound";
import IWizGame from "../models/WizGame";
import IDeck from "../../card_logic/models/Deck";
import IStack from "../../card_logic/models/Stack";
import IWizBet from "../models/WizBet";
import IPlayer from "../../engine/room_logic/models/Player";
import IWizPlayerRoundResult from "../models/WizPlayerRoundResult";

export default class WizRound implements IWizRound {
    id: string
    gameId: IWizGame["id"]
    deck: IDeck
    tableStack: IStack
    currentPlayer: IPlayer["id"];
    playerHands: { [playerId: string]: IStack }
    playerBets: { [playerId: string]: IWizBet }
    playerResults: { [playerId: string]: IWizPlayerRoundResult}

    constructor(id: string, gameId: IWizGame["id"],
                deck: IDeck, tableStack: IStack) {
        this.id = id
        this.gameId = gameId
        this.deck = deck
        this.tableStack = tableStack
        this.currentPlayer = ""
        this.playerHands = {}
        this.playerBets = {}

    }
}