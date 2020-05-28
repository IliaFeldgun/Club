import ICard from "../../card_logic/interfaces/Card";
import IWizPlayer from "./WizPlayer";

export default interface IWizCard extends ICard {
    ownerPlayer: IWizPlayer
}