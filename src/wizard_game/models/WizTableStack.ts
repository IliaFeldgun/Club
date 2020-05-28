import WizGameRules from "./WizGameRules"
import Stack from "../../card_engine/models/Stack"
import { Suit } from "../../card_engine/interfaces/Card"
import IWizCard from "../interfaces/WizCard"
import IWizTableStack from "../interfaces/WizTableStack"
import IPlayer from "../../engine/lobby/interfaces/Player"

export class WizTableStack extends Stack implements IWizTableStack {
    suitRequired?: Suit
    cards: IWizCard[]
    constructor() {
        super([])
    }

    getWinningPlayer() : IPlayer {
        return (WizGameRules.getWinningCard(this.cards, this.suitRequired) as IWizCard).ownerPlayer
    }

    playCard(card: IWizCard) : boolean {

        const isValid = WizGameRules.checkPlayValidity(card, card.ownerPlayer.stack.cards,
                                          this.top(), this.suitRequired)

        if(isValid) {
            this.push(card)
            if(!this.suitRequired)
                this.suitRequired = card.suit
        }

        return isValid
    }
}