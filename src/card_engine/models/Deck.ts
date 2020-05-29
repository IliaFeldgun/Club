import Stack from "./Stack"
import Card from "./Card"
import { Rank, Suit } from "../interfaces/Card"
import IStack from "../interfaces/Stack"
import IDeck from "../interfaces/Deck"

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
                    Stack.push(stack,new Card(suit, rank, false))
                }
            }

            if (jokers) {
                Stack.push(stack, new Card(Suit.HEART, Rank.JOKER, false))
                Stack.push(stack, new Card(Suit.SPADE, Rank.JOKER, false))
            }
        }

        generateDeck(this)
        Stack.shuffle(this)
    }
}