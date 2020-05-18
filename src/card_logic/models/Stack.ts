import ICard from "./Card";

export default interface IStack {
    cards: ICard[]
    shuffle: () => void
    top: () => ICard
    pop: () => ICard
    push: (card: ICard) => void
    contains: (card: ICard) => boolean
}