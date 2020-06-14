import WizGameRules from '../../wizard_game/WizGameRules'
import ICard, { Suit, Rank } from '../../card_engine/interfaces/Card'
test('Cards per player', () => {
    const round = 1
    const cardsPerPlayer = WizGameRules.getCardsPerPlayer(round)
    expect(cardsPerPlayer).toBe(round)
})
test('Total rounds for one player', () => {
    const players = 1
    const totalRounds = WizGameRules.getTotalRounds(players)
    expect(totalRounds).toBe(54)
})
test('Total rounds for two players', () => {
    const players = 2
    const totalRounds = WizGameRules.getTotalRounds(players)
    expect(totalRounds).toBe(27)
})
test('Total rounds for non divisor of 54 players', () => {
    const players = 7
    const totalRounds = WizGameRules.getTotalRounds(players)
    expect(totalRounds).toBe(7)
})
test('Total rounds for divisor of 54 players', () => {
    const players = 6
    const totalRounds = WizGameRules.getTotalRounds(players)
    expect(totalRounds).toBe(9)
})
test('Test for win with one', () => {
    const zeroScore = 0
    const postitiveScore = 50
    const negativeScore = -50
    const playerBet = 1
    const playerResult = 1
    const scoreFromZero = WizGameRules.calculateScore(zeroScore, playerBet, playerResult)
    const scoreFromPostitive = WizGameRules.calculateScore(postitiveScore, playerBet, playerResult)
    const scoreFromNegative = WizGameRules.calculateScore(negativeScore, playerBet, playerResult)
    expect(scoreFromZero).toBe(30)
    expect(scoreFromPostitive).toBe(80)
    expect(scoreFromNegative).toBe(-20)
})
test('Test for win with none', () => {
    const zeroScore = 0
    const postitiveScore = 50
    const negativeScore = -50
    const playerBet = 0
    const playerResult = 0
    const scoreFromZero = WizGameRules.calculateScore(zeroScore, playerBet, playerResult)
    const scoreFromPostitive = WizGameRules.calculateScore(postitiveScore, playerBet, playerResult)
    const scoreFromNegative = WizGameRules.calculateScore(negativeScore, playerBet, playerResult)
    expect(scoreFromZero).toBe(20)
    expect(scoreFromPostitive).toBe(70)
    expect(scoreFromNegative).toBe(-30)
})
test('Test for win with odd', () => {
    const zeroScore = 0
    const postitiveScore = 50
    const negativeScore = -50
    const playerBet = 3
    const playerResult = 3
    const scoreFromZero = WizGameRules.calculateScore(zeroScore, playerBet, playerResult)
    const scoreFromPostitive = WizGameRules.calculateScore(postitiveScore, playerBet, playerResult)
    const scoreFromNegative = WizGameRules.calculateScore(negativeScore, playerBet, playerResult)
    expect(scoreFromZero).toBe(50)
    expect(scoreFromPostitive).toBe(100)
    expect(scoreFromNegative).toBe(0)
})
test('Test for win with even', () => {
    const zeroScore = 0
    const postitiveScore = 50
    const negativeScore = -50
    const playerBet = 6
    const playerResult = 6
    const scoreFromZero = WizGameRules.calculateScore(zeroScore, playerBet, playerResult)
    const scoreFromPostitive = WizGameRules.calculateScore(postitiveScore, playerBet, playerResult)
    const scoreFromNegative = WizGameRules.calculateScore(negativeScore, playerBet, playerResult)
    expect(scoreFromZero).toBe(80)
    expect(scoreFromPostitive).toBe(130)
    expect(scoreFromNegative).toBe(30)
})
test('Test for lose with higher result', () => {
    const zeroScore = 0
    const postitiveScore = 50
    const negativeScore = -50
    const playerBet = 3
    const playerResult = 6
    const scoreFromZero = WizGameRules.calculateScore(zeroScore, playerBet, playerResult)
    const scoreFromPostitive = WizGameRules.calculateScore(postitiveScore, playerBet, playerResult)
    const scoreFromNegative = WizGameRules.calculateScore(negativeScore, playerBet, playerResult)
    expect(scoreFromZero).toBe(-30)
    expect(scoreFromPostitive).toBe(20)
    expect(scoreFromNegative).toBe(-80)
})
test('Test for lose with lower result', () => {
    const zeroScore = 0
    const postitiveScore = 50
    const negativeScore = -50
    const playerBet = 3
    const playerResult = 1
    const scoreFromZero = WizGameRules.calculateScore(zeroScore, playerBet, playerResult)
    const scoreFromPostitive = WizGameRules.calculateScore(postitiveScore, playerBet, playerResult)
    const scoreFromNegative = WizGameRules.calculateScore(negativeScore, playerBet, playerResult)
    expect(scoreFromZero).toBe(-20)
    expect(scoreFromPostitive).toBe(30)
    expect(scoreFromNegative).toBe(-70)
})
test('Test for lose with zero result', () => {
    const zeroScore = 0
    const postitiveScore = 50
    const negativeScore = -50
    const playerBet = 3
    const playerResult = 0
    const scoreFromZero = WizGameRules.calculateScore(zeroScore, playerBet, playerResult)
    const scoreFromPostitive = WizGameRules.calculateScore(postitiveScore, playerBet, playerResult)
    const scoreFromNegative = WizGameRules.calculateScore(negativeScore, playerBet, playerResult)
    expect(scoreFromZero).toBe(-30)
    expect(scoreFromPostitive).toBe(20)
    expect(scoreFromNegative).toBe(-80)
})
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