import { AceHighRank as Rank} from "../enums/Rank"

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

export enum Color {
    RED = 1,
    BLACK
}

export { AceHighRank as Rank } from "../enums/Rank"