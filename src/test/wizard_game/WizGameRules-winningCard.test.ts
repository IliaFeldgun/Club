import WizGameRules from "../../wizard_game/WizGameRules"
import ICard, { Suit, Rank } from '../../card_engine/interfaces/Card'

test("Winning card Joker", () => {
    const stackCards: ICard[] = [
        {suit: Suit.CLUB, rank: Rank.FIVE},
        {suit: Suit.HEART, rank: Rank.JOKER},
        {suit: Suit.DIAMOND, rank: Rank.TEN},
        {suit: Suit.CLUB, rank: Rank.QUEEN}
    ]
    const strongSuit = Suit.DIAMOND

    const winningCard = WizGameRules.getWinningCard(stackCards, strongSuit)
    expect(winningCard).toBe(stackCards[1])
})
test("Winning card two Jokers", () => {
    const stackCards: ICard[] = [
        {suit: Suit.CLUB, rank: Rank.FIVE},
        {suit: Suit.HEART, rank: Rank.JOKER},
        {suit: Suit.DIAMOND, rank: Rank.TEN},
        {suit: Suit.SPADE, rank: Rank.JOKER}
    ]
    const strongSuit = Suit.DIAMOND

    const winningCard = WizGameRules.getWinningCard(stackCards, strongSuit)
    expect(winningCard).toBe(stackCards[3])

})
test("Winning card strong suit", () => {
    const stackCards: ICard[] = [
        {suit: Suit.HEART, rank: Rank.FIVE},
        {suit: Suit.HEART, rank: Rank.KING},
        {suit: Suit.DIAMOND, rank: Rank.TEN},
        {suit: Suit.SPADE, rank: Rank.QUEEN}
    ]
    const strongSuit = Suit.DIAMOND

    const winningCard = WizGameRules.getWinningCard(stackCards, strongSuit)
    expect(winningCard).toBe(stackCards[2])
})
test("Winning card late", () => {
    const stackCards: ICard[] = [
        {suit: Suit.HEART, rank: Rank.FIVE},
        {suit: Suit.SPADE, rank: Rank.KING},
        {suit: Suit.SPADE, rank: Rank.TEN},
        {suit: Suit.HEART, rank: Rank.QUEEN}
    ]
    const strongSuit = Suit.CLUB

    const winningCard = WizGameRules.getWinningCard(stackCards, strongSuit)
    expect(winningCard).toBe(stackCards[3])
})
test("Winning card first", () => {
    const stackCards: ICard[] = [
        {suit: Suit.HEART, rank: Rank.ACE},
        {suit: Suit.SPADE, rank: Rank.KING},
        {suit: Suit.SPADE, rank: Rank.TEN},
        {suit: Suit.HEART, rank: Rank.QUEEN}
    ]
    const strongSuit = Suit.CLUB

    const winningCard = WizGameRules.getWinningCard(stackCards, strongSuit)
    expect(winningCard).toBe(stackCards[0])
})