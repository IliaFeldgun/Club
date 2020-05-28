import ICard, { Rank, Suit, Color } from "../interfaces/Card"

export default class Card implements ICard {
    suit: Suit
    rank: Rank
    face: boolean
    // DeckId: string
    // StackId: string

    constructor(suit: Suit, rank: Rank, face: boolean, deckId?: string){
        this.suit = suit
        this.rank = rank
        this.face = face
    }

    flip() {
        this.face = !this.face
    }

    getColor() {
        let color : Color

        if (this.suit === Suit.HEART || this.suit === Suit.DIAMOND)
        {
            color = Color.RED
        }
        else
        {
            color = Color.BLACK
        }

        return color
    }

    equals(card: ICard): boolean {
        return (card.rank === this.rank && card.suit === this.suit)
    }
}