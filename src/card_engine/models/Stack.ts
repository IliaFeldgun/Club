import ICard from "../interfaces/Card";
import IStack from "../interfaces/Stack";

export default class Stack implements IStack {
    cards: ICard[]
    constructor(cards: ICard[]) {
        this.cards = [...cards]
    }
    static shuffle(stack: IStack) {
        function stackShuffle(cards: ICard[])
        {
            let cardsRemain = cards.length;

            while(cardsRemain) {
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
/*
function riffleShuffle(cards: Array<Card>) {
    const cutDeckVariant = cards.length / 2 + Math.floor(Math.random() * 9) - 4;
    const leftHalf = cards.splice(0, cutDeckVariant);
    let leftCount = leftHalf.length;
    let rightCount = cards.length - Math.floor(Math.random() * 4);
    while(leftCount > 0) {
      const takeAmount = Math.floor(Math.random() * 4);
      cards.splice(rightCount, 0, ...leftHalf.splice(leftCount, takeAmount));
      leftCount -= takeAmount;
      rightCount = rightCount - Math.floor(Math.random() * 4) + takeAmount;
    }
    cards.splice(rightCount, 0, ...leftHalf);
  }
*/