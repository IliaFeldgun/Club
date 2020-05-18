import { AceHighRank as Rank} from "./Rank"

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

export enum Color {
    RED = 1,
    BLACK
}

export { AceHighRank as Rank } from "./Rank"