import WizGameRules from "../../wizard_game/WizGameRules"

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