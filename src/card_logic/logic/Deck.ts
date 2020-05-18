import Stack from "./Stack"
import Card from "./Card"
import { Rank, Suit } from "../models/Card"
import IStack from "../models/Stack"
import IDeck from "../models/Deck"

export default class Deck extends Stack implements IDeck {
    id: string
    jokers: boolean

    constructor(jokers: boolean){
        super([])
        // TODO: decouple
        function generateDeck(stack: IStack)
        {
            const maxRank = Rank.ACE

            for (let suit = Suit.HEART; suit <= Suit.SPADE; suit++) {
                for (let rank = Rank.TWO; rank <= Rank.ACE; rank++){
                    stack.push(new Card(suit, rank, false))
                }
            }

            if (jokers) {
                stack.push(new Card(Suit.HEART, Rank.JOKER, false))
                stack.push(new Card(Suit.SPADE, Rank.JOKER, false))
            }
        }

        generateDeck(this)
        this.shuffle()
    }
}