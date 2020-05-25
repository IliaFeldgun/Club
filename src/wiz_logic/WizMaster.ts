import IPlayer from "../engine/lobby_logic/models/Player";
import ICard from "../card_logic/models/Card";
import WizGameRules from "./logic/WizGameRules";
import IWizRound from "./models/WizRound";
import WizStore from "./WizStore";
import IWizGame from "./models/WizGame";

export default class WizMaster {
    static playCard(round: IWizRound,
                    cardPlayed: ICard,
                    playerId: IPlayer["id"]): IWizRound
    {
        if (WizMaster.canPlayCard(round, cardPlayed, playerId)) {
            const cardsLeft = round.playerHands[playerId].filter(card =>
                card.equals(cardPlayed))

            round.playerHands[playerId] = cardsLeft

            WizMaster.advanceRound(round)
            // if (WizMaster.areAllHandsEmpty(round))
            return round
        }
        else
            return null
    }
    private static canPlayCard(round: IWizRound,
                       cardPlayed: ICard,
                       playerId: IPlayer["id"]): boolean
    {
        const isCurrentPlayer = playerId === WizMaster.getCurrentPlayer(round)
        const isCardInHand = -1 !== round.playerHands[playerId].findIndex(card =>
            cardPlayed.equals(card))

        const playerCards = round.playerHands[playerId]
        const topCard = round.tableStack.top()
        const requiredSuit = WizGameRules.getRequiredSuit(round.tableStack.cards)
        const isMoveValid = WizGameRules.checkPlayValidity(cardPlayed,
            playerCards, topCard, requiredSuit)

        return isCurrentPlayer && isCardInHand && isMoveValid
    }
    private static advanceRound(round: IWizRound) {

        WizMaster.assertWinner(round.id)

        round.turnNumber++
    }
    private static async assertWinner(roundId: IWizRound["id"]): Promise<boolean> {
        const round = await WizStore.getWizRound(roundId)
        if (round) {
            return false
        }
        else {
            if (WizMaster.didAllPlayTurn(round)) {
                const requiredSuit =
                    WizGameRules.getRequiredSuit(round.tableStack.cards)

                const winningCard =
                    WizGameRules.getWinningCard(round.tableStack.cards, requiredSuit)

                const winningPlayer = WizMaster.getPlayerByCard(round, winningCard)
                // TODO: Refactor it somehow
                round.playerResults[winningPlayer].successfulTakes++

                return await WizStore.setWizRound(roundId, round)
            }
        }
    }
    private static addTakeToPlayerResult(round: IWizRound, winningPlayer: IPlayer["id"]) {
        round.playerResults[winningPlayer].successfulTakes++

    }
    private static getPlayerByCard(round: IWizRound, card: ICard): IPlayer["id"] {
        const cardIndex = round.tableStack.indexOf(card)
        return round.playerOrder[cardIndex]
    }
    private static getCurrentPlayer(round: IWizRound) {
        const currentPlayerNum = round.turnNumber % round.playerOrder.length

        return round.playerOrder[currentPlayerNum - 1]
    }
    private static didAllPlayTurn(round: IWizRound): boolean {
        return (round.turnNumber % round.playerOrder.length === 0)

    }
    private static areAllHandsEmpty(round: IWizRound): boolean {
        const playerHands = Object.entries(round.playerHands)
        const allEmpty = !playerHands.some(([player,cards]) => cards.length)

        return allEmpty
    }
    static async dealCards(roundId: IWizRound["id"]): Promise<boolean> {
        
        const round = await WizStore.getWizRound(roundId)
        
        if (round) {
            return false
        }
        else 
        {
            const totalRounds =
                WizGameRules.getTotalRounds(round.playerOrder.length)

            if (round.roundNumber > totalRounds) {
                return false
            }
            else {
                const cardsToDeal =
                    WizGameRules.getCardsPerPlayer(round.roundNumber)

                for (let i = cardsToDeal; i > 0; i--) {
                    round.playerOrder.forEach(playerId =>
                        round.playerHands[playerId].push(round.deck.pop()))
                }

                return await WizStore.setWizRound(round.id, round)
            }
        }
    }
    static async getWizRoundByGame(gameId: IWizGame["id"]): Promise<IWizRound> {
        const game = await WizStore.getWizGame(gameId)
        if (game) {
            const round = WizStore.getWizRound(game.currentRoundId)
            return round
        }
        else {
            return undefined
        }
    }
}