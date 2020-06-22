import IStack from "../../card_engine/interfaces/Stack";
import IWizBet from "./WizBet";
import IDeck from "../../card_engine/interfaces/Deck";
import IPlayer from "../../engine/lobby/interfaces/Player";
import IWizPlayerRoundResult from "./WizPlayerRoundResult";
import ICard, { Suit } from "../../card_engine/interfaces/Card";
import { PossibleMoves } from "../enums/PossibleMoves";

export default interface IWizRound {
    roundNumber: number
    turnNumber:number
    nextMove: PossibleMoves
    deck: IDeck
    strongSuit: Suit
    tableStack: IStack
    playerOrder: IPlayer["id"][]
    playerHands: { [playerId: string]: ICard[] }
    playerBets: { [playerId: string]: IWizBet }
    playerResults: { [playerId: string]: IWizPlayerRoundResult}
}