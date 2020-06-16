import WizGameRules from "../../wizard_game/WizGameRules"
import ICard, { Suit, Rank } from '../../card_engine/interfaces/Card'

test('Required suit for one card', () => {
    const clubCards: ICard[] = [{suit: Suit.CLUB, rank: Rank.ACE}]
    const diamondCards: ICard[] = [{suit: Suit.DIAMOND, rank: Rank.THREE}]
    const heartCards: ICard[] = [{suit: Suit.HEART, rank: Rank.JACK}]
    const spadeCards: ICard[] = [{suit: Suit.SPADE, rank: Rank.SIX}]
    const clubSuit = WizGameRules.getRequiredSuit(clubCards)
    const diamondSuit = WizGameRules.getRequiredSuit(diamondCards)
    const heartSuit = WizGameRules.getRequiredSuit(heartCards)
    const spadeSuit = WizGameRules.getRequiredSuit(spadeCards)
    expect(clubSuit).toBe(Suit.CLUB)
    expect(diamondSuit).toBe(Suit.DIAMOND)
    expect(heartSuit).toBe(Suit.HEART)
    expect(spadeSuit).toBe(Suit.SPADE)
})
test('Required suit for multiple cards', () => {
    const clubCards: ICard[] = [
        {suit: Suit.CLUB, rank: Rank.KING},
        {suit: Suit.DIAMOND, rank: Rank.EIGHT},
        {suit: Suit.SPADE, rank: Rank.JOKER}
    ]
    const diamondCards: ICard[] = [
        {suit: Suit.DIAMOND, rank: Rank.QUEEN},
        {suit: Suit.HEART, rank: Rank.JOKER},
        {suit: Suit.HEART, rank: Rank.JACK}
    ]
    const heartCards: ICard[] = [
        {suit: Suit.HEART, rank: Rank.JACK},
        {suit: Suit.SPADE, rank: Rank.FIVE},
        {suit: Suit.SPADE, rank: Rank.FOUR}
    ]
    const spadeCards: ICard[] = [
        {suit: Suit.SPADE, rank: Rank.SIX},
        {suit: Suit.DIAMOND, rank: Rank.JACK},
        {suit: Suit.CLUB, rank: Rank.JACK}

    ]
    const clubSuit = WizGameRules.getRequiredSuit(clubCards)
    const diamondSuit = WizGameRules.getRequiredSuit(diamondCards)
    const heartSuit = WizGameRules.getRequiredSuit(heartCards)
    const spadeSuit = WizGameRules.getRequiredSuit(spadeCards)
    expect(clubSuit).toBe(Suit.CLUB)
    expect(diamondSuit).toBe(Suit.DIAMOND)
    expect(heartSuit).toBe(Suit.HEART)
    expect(spadeSuit).toBe(Suit.SPADE)
})
test('Required suit joker', () => {
    const jokerRedCards: ICard[] = [
        {suit: Suit.HEART, rank: Rank.JOKER}
    ]
    const jokerBlackCards: ICard[] = [
        {suit: Suit.SPADE, rank: Rank.JOKER},
        {suit: Suit.CLUB, rank: Rank.JACK}
    ]
    const jokerRedSuit = WizGameRules.getRequiredSuit(jokerRedCards)
    const jokerBlackSuit = WizGameRules.getRequiredSuit(jokerBlackCards)
    expect(jokerBlackSuit).toBe(null)
    expect(jokerRedSuit).toBe(null)
})
test('Required suit no cards', () => {
    const cards: ICard[] = []
    const requiredSuit = WizGameRules.getRequiredSuit(cards)
    expect(requiredSuit).toBe(null)
})