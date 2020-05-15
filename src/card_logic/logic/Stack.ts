export default class Stack implements IStack {
    cards: ICard[]
    constructor(cards: ICard[]) {
        this.cards = [...cards]
    }
    shuffle() {
        function stackShuffle(cards: ICard[])
        {
            let cardsRemain = cards.length;

            while(cardsRemain) {
                cards.push(cards.splice(Math.floor(Math.random() * cardsRemain), 1)[0])
                cardsRemain--
            }
        }

        stackShuffle(this.cards)
    }
    pop() {
        return this.cards.pop()
    }
    top() {
        return this.cards.slice(-1).pop()
    }
    push(card: ICard) {
        this.cards.push(card);
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