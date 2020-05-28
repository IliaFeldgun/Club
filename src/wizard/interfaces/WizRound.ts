import IStack from "../../card_engine/interfaces/Stack";
import IWizBet from "./WizBet";
import IDeck from "../../card_engine/interfaces/Deck";
import IWizGame from "./WizGame";
import IPlayer from "../../engine/lobby/interfaces/Player";
import IWizPlayerRoundResult from "./WizPlayerRoundResult";
import ICard from "../../card_engine/interfaces/Card";

export default interface IWizRound {
    id: string
    roundNumber: number
    turnNumber:number
    gameId: IWizGame["id"]
    deck: IDeck
    tableStack: IStack
    playerOrder: IPlayer["id"][]
    playerHands: { [playerId: string]: ICard[] }
    playerBets: { [playerId: string]: IWizBet }
    playerResults: { [playerId: string]: IWizPlayerRoundResult}
}