import IStack from "../../card_logic/models/Stack";
import IWizBet from "./WizBet";
import IDeck from "../../card_logic/models/Deck";
import IWizGame from "./WizGame";
import IPlayer from "../../engine/room_logic/models/Player";
import IWizPlayerRoundResult from "./WizPlayerRoundResult";

export default interface IWizRound {
    id: string
    gameId: IWizGame["id"]
    deck: IDeck
    tableStack: IStack
    currentPlayer: IPlayer["id"]
    playerHands: { [playerId: string]: IStack }
    playerBets: { [playerId: string]: IWizBet }
    playerResults: { [playerId: string]: IWizPlayerRoundResult}
}