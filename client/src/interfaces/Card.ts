export default interface ICard {
    suit: Suit
    rank: Rank
}


export enum Suit {
    HEART = 1,
    DIAMOND,
    CLUB,
    SPADE
}

export enum Rank {
    TWO = 2,
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
    ACE,
    JOKER
}

export enum Color {
    RED = 1,
    BLACK
}