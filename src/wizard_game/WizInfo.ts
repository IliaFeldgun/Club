import IWizRound from "./interfaces/WizRound"
import IPlayer from "../engine/lobby/interfaces/Player"
import ICard, { Suit } from "../card_engine/interfaces/Card"
import WizGameRules from "./WizGameRules"
import Card from "../card_engine/models/Card"
import Stack from "../card_engine/models/Stack"
import { PossibleMoves } from "./enums/PossibleMoves"
import IWizGame from "./interfaces/WizGame"
import WizScore from "./models/WizScore"

export default class WizInfo {
    static getPlayerByCard(round: IWizRound, card: ICard): IPlayer["id"] {
        const cardIndex = Stack.indexOf(round.tableStack, card)
        return round.playerOrder[cardIndex]
    }
    static getCurrentPlayer(round: IWizRound): IPlayer["id"] {
        return round.playerOrder[0]
    }
    static didAllPlayTurn(round: IWizRound): boolean {
        return (round.turnNumber % round.playerOrder.length === 0)
    }
    static areAllHandsEmpty(round: IWizRound): boolean {
        const playerHands = Object.entries(round.playerHands)
        const allEmpty = !playerHands.some(([player,cards]) => cards.length)

        return allEmpty
    }
    static didAllBet(round: IWizRound): boolean {
        const playerBets = Object.entries(round.playerBets).length
        const players = round.playerOrder.length
        return playerBets === players
    }
    static getPlayerHandSizes(round: IWizRound):
        { [playerId: string]: number } {

        const playerHandSizes: {[playerId: string]: number} = {}

        if (round && round.playerHands) {
            Object.keys(round.playerHands).forEach((playerId) => {
                playerHandSizes[playerId] = round.playerHands[playerId].length
            })
        }

        return playerHandSizes
    }
    static canPlayCard(round: IWizRound,
                       cardPlayed: ICard,
                       playerId: IPlayer["id"]): boolean
    {
        const shouldPlayCard = round.nextMove === PossibleMoves.PLAY_CARD
        const isCurrentPlayer = playerId === WizInfo.getCurrentPlayer(round)
        const isCardInHand = -1 !== round.playerHands[playerId].findIndex(card =>
            Card.equals(cardPlayed, card)
        )

        const playerCards = round.playerHands[playerId]
        const isMoveValid = WizGameRules.checkPlayValidity(
            cardPlayed,
            playerCards,
            round.tableStack.cards
        )

        return shouldPlayCard && isCurrentPlayer && isCardInHand && isMoveValid
    }
    static canPlayBet(round: IWizRound,
                      bet: number,
                      playerId: IPlayer["id"]): boolean {
        const isCurrentPlayer = playerId === WizInfo.getCurrentPlayer(round)
        const isBetValid = bet <= round.roundNumber && bet >= 0
        const shouldBet = round.nextMove === PossibleMoves.PLACE_BET

        return isCurrentPlayer && isBetValid && shouldBet
    }
    static getPlayerHand(round: IWizRound, playerId: IPlayer["id"]): ICard[] {
        return round.playerHands[playerId]
    }
    static getTableStack(round: IWizRound): ICard[] {
        return round.tableStack.cards
    }
    static getBets(round: IWizRound): { [playerId: string]: number} {
        const playerBets: {[playerId: string]: number} = {}

        if(round && round.playerBets) {
            Object.keys(round.playerBets).forEach((playerId) => {
                playerBets[playerId] = round.playerBets[playerId].takes
            })
        }

        return playerBets
    }
    static getRoundStrongSuit(round: IWizRound): Suit {
        return round.strongSuit
    }
    static getGamePlayerIds(game: IWizGame): IPlayer["id"][] {
        return game.playerOrder
    }
    static getGameInstruction(game: IWizGame): PossibleMoves {
        let nextMove = PossibleMoves.NONE

        if (game.isDone){
            nextMove = PossibleMoves.ANNOUNCE_WIN
        }
        else {
            const round = game.currentRound
            if (round) {
                nextMove = round.nextMove
            }
        }

        return nextMove
    }
    static isGameDone(game: IWizGame): boolean {
        const totalRounds =
            WizGameRules.getTotalRounds(game.playerOrder.length)
        return game.currentRound.roundNumber > totalRounds
    }
    static getGameWinner(game: IWizGame): IPlayer["id"] {
        const maxScore = WizScore.max(Object.values(game.playerScores))
        const winner = Object.entries(game.playerScores).find(([player, score]) => {
            return score.total === maxScore
        })

        return winner[0]

    }
}