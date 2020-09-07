import ICard from "../interfaces/Card";
import IStack from "../interfaces/Stack";

export default class Stack implements IStack {
    cards: ICard[]
    constructor(cards: ICard[]) {
        this.cards = [...cards]
    }
    static shuffle(stack: IStack) {
        function stackShuffle(cards: ICard[]) {
            let cardsRemain = cards.length;

            while (cardsRemain) {
                cards.push(cards.splice(Math.floor(Math.random() * cardsRemain), 1)[0])
                cardsRemain--
            }
        }

        stackShuffle(stack.cards)
    }
    static pop(stack: IStack) {
        return stack.cards.pop()
    }
    static top(stack: IStack) {
        return stack.cards.slice(-1).pop()
    }
    static push(stack: IStack, card: ICard) {
        stack.cards.push(card);
    }
    static indexOf(stack: IStack, card: ICard): number {
        return stack.cards.findIndex((stackCard) =>
            stackCard.rank === card.rank && stackCard.suit === card.suit)
    }
}