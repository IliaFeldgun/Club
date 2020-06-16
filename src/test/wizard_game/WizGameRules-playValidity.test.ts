import WizGameRules from "../../wizard_game/WizGameRules"
import ICard, { Suit, Rank } from '../../card_engine/interfaces/Card'

test('Joker play valid', () => {
    const stackCards: ICard[] = [
        {suit: Suit.DIAMOND, rank: Rank.JACK}
    ]
    const playerCardsNoRequired: ICard[] = [
        {suit: Suit.HEART, rank: Rank.FOUR},
        {suit: Suit.CLUB, rank: Rank.SEVEN}
    ]
    const playerCardsRequired: ICard[] = [
        {suit: Suit.DIAMOND, rank: Rank.FOUR}
    ]
    const redJoker = {suit: Suit.HEART, rank: Rank.JOKER}
    const blackJoker = {suit: Suit.SPADE, rank: Rank.JOKER}
    const redNoRequired = WizGameRules.checkPlayValidity(redJoker, playerCardsNoRequired, stackCards)
    const blackNoRequired = WizGameRules.checkPlayValidity(blackJoker, playerCardsNoRequired, stackCards)
    const redRequired = WizGameRules.checkPlayValidity(redJoker, playerCardsRequired, stackCards)
    const blackRequired = WizGameRules.checkPlayValidity(blackJoker, playerCardsRequired, stackCards)
    expect(redNoRequired).toBe(true)
    expect(blackNoRequired).toBe(true)
    expect(redRequired).toBe(true)
    expect(blackRequired).toBe(true)
})
test('Empty stack valid', () => {
    const stackCards: ICard[] = [
    ]
    const playerCards: ICard[] = [
        {suit: Suit.HEART, rank: Rank.FOUR},
        {suit: Suit.CLUB, rank: Rank.SEVEN}
    ]
    const cardPlayed = {suit: Suit.HEART, rank: Rank.JACK}
    const isValid = WizGameRules.checkPlayValidity(cardPlayed, playerCards, stackCards)
    expect(isValid).toBe(true)
})
test('Joker stack valid', () => {
    const stackCards: ICard[] = [
        {suit: Suit.HEART, rank: Rank.JOKER}
    ]
    const playerCards: ICard[] = [
        {suit: Suit.HEART, rank: Rank.FOUR},
        {suit: Suit.CLUB, rank: Rank.SEVEN}
    ]
    const cardPlayed = {suit: Suit.HEART, rank: Rank.JACK}
    const isValid = WizGameRules.checkPlayValidity(cardPlayed, playerCards, stackCards)
    expect(isValid).toBe(true)
})
test('Card required valid', () => {
    const stackOneCard: ICard[] = [
        {suit: Suit.DIAMOND, rank: Rank.QUEEN},
    ]
    const stackCards: ICard[] = [
        {suit: Suit.DIAMOND, rank: Rank.KING},
        {suit: Suit.CLUB, rank: Rank.TWO},
        {suit: Suit.SPADE, rank: Rank.SEVEN}
    ]
    const playerCards: ICard[] = [
        {suit: Suit.HEART, rank: Rank.FOUR},
        {suit: Suit.CLUB, rank: Rank.SEVEN}
    ]
    const cardPlayed = {suit: Suit.DIAMOND, rank: Rank.JACK}
    const isOneValid = WizGameRules.checkPlayValidity(cardPlayed, playerCards, stackOneCard)
    const isMultipleValid = WizGameRules.checkPlayValidity(cardPlayed, playerCards, stackCards)
    expect(isOneValid).toBe(true)
    expect(isMultipleValid).toBe(true)
})
test('Card required invalid, no other cards available', () => {
    const stackCards: ICard[] = [
        {suit: Suit.CLUB, rank: Rank.NINE},
        {suit: Suit.DIAMOND, rank: Rank.SEVEN}
    ]
    const playerCards: ICard[] = [
        {suit: Suit.SPADE, rank: Rank.FIVE},
        {suit: Suit.SPADE, rank: Rank.QUEEN},
        {suit: Suit.HEART, rank: Rank.QUEEN}
    ]
    const cardPlayed = {suit: Suit.HEART, rank: Rank.SIX}
    const isValid = WizGameRules.checkPlayValidity(cardPlayed, playerCards, stackCards)
    expect(isValid).toBe(true)

})
test('Card required invalid, other cards available', () => {
    const stackCards: ICard[] = [
        {suit: Suit.CLUB, rank: Rank.NINE},
        {suit: Suit.DIAMOND, rank: Rank.SEVEN}
    ]
    const playerCards: ICard[] = [
        {suit: Suit.SPADE, rank: Rank.FIVE},
        {suit: Suit.CLUB, rank: Rank.QUEEN},
        {suit: Suit.HEART, rank: Rank.QUEEN}
    ]
    const cardPlayed = {suit: Suit.HEART, rank: Rank.SIX}
    const isValid = WizGameRules.checkPlayValidity(cardPlayed, playerCards, stackCards)
    expect(isValid).toBe(false)
})
