import Card from '../../../card_engine/models/Card'
import { Suit, Rank } from '../../../card_engine/interfaces/Card'

describe('Testing card model', () => {
    test('Testing card creation', () => {
        const card = new Card(Suit.CLUB, Rank.ACE)
        const cardMock = {
            suit: Suit.CLUB,
            rank: Rank.ACE
        }
        expect(card).toMatchObject(cardMock)
    })
    test('Testing isCard check', () => {
        const card = new Card(Suit.HEART, Rank.QUEEN)
        const card2 = {suit: Suit.DIAMOND, rank: Rank.EIGHT}
        const badCard = {suit: Suit.SPADE, rank: Rank.FIVE, bad: "okay"}
        const badCard2 = {suit: 200, rank: Rank.FOUR}
        const badCard3 = {suit: Suit.CLUB, rank: -12}
        const badCard4 = {suit: -11, rank: Rank.SIX}
        const badCard5 = {suit: Suit.HEART, rank: 500}
        expect(Card.isCard(card)).toBe(true)
        expect(Card.isCard(card2)).toBe(true)
        expect(Card.isCard(badCard)).toBe(false)
        expect(Card.isCard(badCard2)).toBe(false)
        expect(Card.isCard(badCard3)).toBe(false)
        expect(Card.isCard(badCard4)).toBe(false)
        expect(Card.isCard(badCard5)).toBe(false)
    })
    test('Testing equals check', () => {
        const card = new Card(Suit.DIAMOND, Rank.KING)
        const cardAgain = {suit: Suit.DIAMOND, rank: Rank.KING}
        const cardSameSuit = new Card(Suit.DIAMOND, Rank.JACK)
        const cardSameRank = new Card(Suit.SPADE, Rank.KING)
        const cardOther = new Card(Suit.CLUB, Rank.JOKER)

        expect(Card.equals(card, cardAgain)).toBe(true)
        expect(Card.equals(card, cardSameSuit)).toBe(false)
        expect(Card.equals(card, cardSameRank)).toBe(false)
        expect(Card.equals(card, cardOther)).toBe(false)
    })
})