import WizGameRules from "./WizGameRules"
import Stack from "../../card_logic/logic/Stack"
import { Suit } from "../../card_logic/models/Card"
import IWizCard from "../models/WizCard"
import IWizTableStack from "../models/WizTableStack"
import IPlayer from "../../engine/lobby/models/Player"

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