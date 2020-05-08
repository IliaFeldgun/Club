export const WIN_SCORE = 20
export const TAKE_SCORE = 10
export const TAKE_LOSE_SCORE = 10

export function getCardsPerPlayer(turn: number, players: number) {
    return turn * players
}

export function calculateScore(playerScore: number,
                               playerBet: number,
                               playerResult: number) {
    let total = playerScore

    if (playerBet === playerResult) {
        total += WIN_SCORE + TAKE_SCORE * playerBet
    }
    else {
        total -= TAKE_LOSE_SCORE * Math.abs(playerBet - playerResult)
    }

    return total
}

export function checkPlayValidity(playerCard: ICard,
                                  playerCards: ICard[],
                                  topCard?: ICard,
                                  suitRequired?: Suit): boolean {

    if (!topCard || !suitRequired ||
        playerCard.rank === Rank.JOKER || playerCard.suit === suitRequired ||
        !playerCards.filter(card => card.suit === suitRequired).pop())
        return true
    return false
}

export function getWinningCard(cards: ICard[], suitRequired: Suit): ICard {
    const relevantCards = cards.filter(card =>
        card.suit === suitRequired || card.rank === Rank.JOKER)
    return relevantCards.sort((cardA, cardB) =>
        cardA.rank - cardB.rank).pop()
}