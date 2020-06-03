import ICard, { Suit, Rank } from "../card_engine/interfaces/Card"

export default class WizGameRules {
    static WIN_SCORE = 20
    static TAKE_SCORE = 10
    static TAKE_LOSE_SCORE = 10
    static TOTAL_CARDS = 54
    static MAX_PLAYERS = 10

    static getCardsPerPlayer(round: number) {
        return round
    }
    static getTotalRounds(players: number) {
        return Math.floor(this.TOTAL_CARDS / players)
    }
    static calculateScore(playerScore: number,
                          playerBet: number,
                          playerResult: number)
    {
        let total = playerScore

        if (playerBet === playerResult) {
            total += WizGameRules.WIN_SCORE + WizGameRules.TAKE_SCORE * playerBet
        }
        else {
            total -= WizGameRules.TAKE_LOSE_SCORE * Math.abs(playerBet - playerResult)
        }

        return total
    }

    static getRequiredSuit(stackCards: ICard[]) : Suit {
        const firstCard = stackCards[0]

        if (firstCard && firstCard.rank !== Rank.JOKER) {
            return firstCard.suit
        }
        else return null
    }

    static checkPlayValidity(playerCard: ICard,
                                    playerCards: ICard[],
                                    topCard?: ICard,
                                    suitRequired?: Suit): boolean {
        return (!topCard ||
                !suitRequired ||
                playerCard.rank === Rank.JOKER ||
                playerCard.suit === suitRequired ||
                !playerCards.some(card => card.suit === suitRequired))
    }

    static getWinningCard(cards: ICard[], suitRequired: Suit): ICard {
        const relevantCards = cards.filter(card =>
            card.suit === suitRequired || card.rank === Rank.JOKER)
        return relevantCards.slice().sort((cardA, cardB) =>
            cardA.rank - cardB.rank).pop()
    }
}