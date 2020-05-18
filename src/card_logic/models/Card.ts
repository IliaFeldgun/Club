export default interface ICard {
    suit: Suit
    rank: Rank
    face: boolean
    flip: () => void
    getColor: () => Color
}


export enum Suit {
    HEART = 1,
    DIAMOND,
    CLUB,
    SPADE
}

export enum Rank {
    ACE = 1,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING,
    JOKER
}

export enum Color {
    RED = 1,
    BLACK
}