import WizGameRules from "./WizGameRules"
import IWizRound from "./interfaces/WizRound"
import IWizGame from "./interfaces/WizGame"
import IPlayer from "../engine/lobby/interfaces/Player"
import WizBuilder from "./WizBuilder"
import WizInfo from "./WizInfo"
import WizBet from "./models/WizBet"
import { PossibleMoves } from "./enums/PossibleMoves"
import ICard from "../card_engine/interfaces/Card"
import Card from "../card_engine/models/Card"
import Stack from "../card_engine/models/Stack"

export default class WizMutator {
    static playBet(
        round: IWizRound,
        bet: number,
        playerId: IPlayer["id"]
    ): void {

        round.playerBets[playerId] = new WizBet(bet)
        WizMutator.nextPlayer(round.playerOrder)
        if (WizInfo.didAllBet(round)) {
            round.nextMove = PossibleMoves.PLAY_CARD
        }
    }
    
    static playCard(
        game: IWizGame,
        cardPlayed: ICard,
        playerId: IPlayer["id"]
    ): void {
        
        const round = game.currentRound
        const cardsLeft = round.playerHands[playerId].filter(card =>
            !Card.equals(cardPlayed, card)
        )

        round.playerHands[playerId] = cardsLeft
        Stack.push(round.tableStack, cardPlayed)
        WizMutator.nextPlayer(round.playerOrder)

        const takeWinner = WizMutator.assertWinner(round)

        if (takeWinner) {
            round.playerOrder =
                WizBuilder.generatePlayerOrder(takeWinner, round.playerOrder)
        }

        if (WizInfo.areAllHandsEmpty(round)) {
            WizMutator.calculateScores(game)
            WizMutator.nextRound(game)
            game.isDone = WizInfo.isGameDone(game)
        }
        else {
            WizMutator.nextTurn(round)
        }
    }
    static dealCards(round: IWizRound): boolean {
        if (!round) {
            return false
        }
        else
        {
            const totalRounds =
                WizGameRules.getTotalRounds(round.playerOrder.length)

            // TODO: Assess if this is needed
            if (round.roundNumber > totalRounds) {
                return false
            }
            else {
                const cardsToDeal =
                    WizGameRules.getCardsPerPlayer(round.roundNumber)

                round.strongSuit = WizGameRules.getStrongSuit(round.deck.cards)

                for (let i = cardsToDeal; i > 0; i--) {
                    round.playerOrder.forEach(playerId =>
                        round.playerHands[playerId].push(round.deck.cards.pop()))
                }

                return true
            }
        }
    }
    static nextRound(game: IWizGame): boolean {
        const currentRound = game.currentRound
        WizMutator.nextPlayer(game.playerOrder)

        const newRound = WizBuilder.newRoundState(
            game.id, 
            currentRound.roundNumber, 
            game.playerOrder, 
            game.playerOrder[0]
        )

        const areCardsDealt  = WizMutator.dealCards(newRound)

        if (newRound && areCardsDealt && game) {
            game.currentRound = newRound
            return true
        }
        else {
            return false
        }
    }
    static calculateScores(game: IWizGame) {
        const round = game.currentRound
        round.playerOrder.forEach((playerId) => {
            const newScore =
                WizGameRules.calculateScore(game.playerScores[playerId].total,
                    round.playerBets[playerId].takes,
                    round.playerResults[playerId].successfulTakes)
            game.playerScores[playerId].total = newScore
        })
    }    
    static nextTurn(round: IWizRound) {
        round.turnNumber++
    }
    static nextPlayer(playerOrder: IPlayer["id"][]) {
        playerOrder.push(playerOrder.shift())
    }

    static assertWinner(round: IWizRound): IPlayer["id"] {
        if (round && WizInfo.didAllPlayTurn(round)) {
            const winningCard =
                WizGameRules.getWinningCard(round.tableStack.cards, round.strongSuit)

            const winningPlayer = WizInfo.getPlayerByCard(round, winningCard)
            WizMutator.addTakeToPlayerResult(round, winningPlayer)
            // TODO: Refactor
            round.tableStack.cards = []
            return winningPlayer
        }
        else {
            return ""
        }
    }
    static addTakeToPlayerResult(round: IWizRound, winningPlayer: IPlayer["id"]) {
        round.playerResults[winningPlayer].successfulTakes++
    }
}