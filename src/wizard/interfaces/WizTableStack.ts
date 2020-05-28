import { Suit } from "../../card_logic/interfaces/Card";
import IStack from "../../card_logic/interfaces/Stack";
import IWizCard from "./WizCard";
import IPlayer from "../../engine/lobby/interfaces/Player";

export default interface IWizTableStack extends IStack {
    suitRequired?: Suit
    cards: IWizCard[]
    playCard: (card: IWizCard) => boolean
    getWinningPlayer: () => IPlayer
}