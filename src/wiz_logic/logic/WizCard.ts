import Card from "../../card_logic/logic/Card"
import { Suit } from "../../card_logic/models/Card"
import { Rank } from "../../card_logic/models/Card"
import IWizCard from "../models/WizCard"
import IWizPlayer from "../models/WizPlayer"

class WizCard extends Card implements IWizCard {
    ownerPlayer: IWizPlayer
    constructor(suit: Suit, rank: Rank, face: boolean, ownerPlayer: IWizPlayer, deckId?: string) {
        super(suit, rank, face, deckId)

        this.ownerPlayer = ownerPlayer
    }
}