import ICard, { Rank, Suit, Color } from "../interfaces/Card"
import { isNumber } from "util"

export default class Card implements ICard {
    suit: Suit
    rank: Rank
    // face: boolean
    // DeckId: string
    // StackId: string

    constructor(suit: Suit, rank: Rank){
        this.suit = suit
        this.rank = rank
        // this.face = face
    }

    // flip() {
    //     this.face = !this.face
    // }

    // getColor() {
    //     let color : Color

    //     if (this.suit === Suit.HEART || this.suit === Suit.DIAMOND)
    //     {
    //         color = Color.RED
    //     }
    //     else
    //     {
    //         color = Color.BLACK
    //     }

    //     return color
    // }

    static isCard(card: ICard): boolean {
        const hasTwoProps = Object.keys(card).length === 2
        return hasTwoProps && isNumber(card.rank) && isNumber(card.suit)
    }
    static equals(card1: ICard, card2: ICard): boolean {
        return (card1.rank === card2.rank && card1.suit === card2.suit)
    }
}