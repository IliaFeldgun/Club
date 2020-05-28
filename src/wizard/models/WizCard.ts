import ICard from "../../card_logic/models/Card";
import IWizPlayer from "./WizPlayer";

export default interface IWizCard extends ICard {
    ownerPlayer: IWizPlayer
}