import IWizCard from "../interfaces/WizCard"
import IWizTableStack from "../interfaces/WizTableStack"

import Stack from "../../card_engine/models/Stack"
import { Suit } from "../../card_engine/interfaces/Card"


export class WizTableStack extends Stack implements IWizTableStack {
    suitRequired?: Suit
    cards: IWizCard[]
    constructor() {
        super([])
    }
}