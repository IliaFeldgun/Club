import { Suit } from "../../card_engine/interfaces/Card";
import IStack from "../../card_engine/interfaces/Stack";
import IWizCard from "./WizCard";
import IPlayer from "../../engine/lobby/interfaces/Player";

export default interface IWizTableStack extends IStack {
    suitRequired?: Suit
    cards: IWizCard[]
}