import WizGameRules from '../../wizard_game/WizGameRules'

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