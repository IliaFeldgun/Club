import Stack from "./Stack"

export default class Deck extends Stack implements IDeck {
    id: string
    jokers: boolean

    constructor(jokers: boolean){
        super([])

        function generateDeck(stack: Stack)
        {
            const maxRank = Rank.ACE

            for (let suit = Suit.HEART; suit <= Suit.SPADE; suit++) {
                for (let rank = Rank.ACE; rank <= Rank.KING; rank++){
                    stack.push(new Card(suit, rank, false))
                }
            }

            if (jokers) {
                stack.push(new Card(Suit.HEART, Rank.JOKER, false))
                stack.push(new Card(Suit.SPADE, Rank.JOKER, false))
            }
        }

        generateDeck(this)
        this.shuffle()
    }
}