import Stack from "./Stack"
import Card from "./Card"
import { Rank, Suit } from "../interfaces/Card"
import IStack from "../interfaces/Stack"
import IDeck from "../interfaces/Deck"

export default class Deck extends Stack implements IDeck {
    id: string
    jokers: boolean

    constructor(jokers: boolean) {
        super([])
        Deck.generateDeck(this, jokers)
        Stack.shuffle(this)
    }

    private static generateDeck(stack: IStack, jokers: boolean) {
        const maxRank = Rank.ACE

        for (let suit = Suit.HEART; suit <= Suit.SPADE; suit++) {
            for (let rank = Rank.TWO; rank <= Rank.ACE; rank++) {
                Stack.push(stack, new Card(suit, rank))
            }
        }

        if (jokers) {
            Stack.push(stack, new Card(Suit.HEART, Rank.JOKER))
            Stack.push(stack, new Card(Suit.SPADE, Rank.JOKER))
        }
    }
}