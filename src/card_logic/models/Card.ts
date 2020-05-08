interface ICard {
    suit: Suit
    rank: Rank
    face: boolean
    flip: () => void
    getColor: () => Color
}


enum Suit {
    HEART = 1,
    DIAMOND,
    CLOVER,
    SPADE
}

enum Rank {
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

enum Color {
    RED = 1,
    BLACK
}