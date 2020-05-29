import IWizRound from "./interfaces/WizRound"
import IPlayer from "../engine/lobby/interfaces/Player"
import ICard from "../card_engine/interfaces/Card"
import WizGameRules from "./WizGameRules"
import Card from "../card_engine/models/Card"
import Stack from "../card_engine/models/Stack"

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
        const isCurrentPlayer = playerId === WizInfo.getCurrentPlayer(round)
        const isCardInHand = -1 !== round.playerHands[playerId].findIndex(card =>
            Card.equals(cardPlayed, card)
        )

        const playerCards = round.playerHands[playerId]
        const topCard = Stack.top(round.tableStack)
        const requiredSuit = WizGameRules.getRequiredSuit(round.tableStack.cards)
        const isMoveValid = WizGameRules.checkPlayValidity(cardPlayed,
            playerCards, topCard, requiredSuit)

        return isCurrentPlayer && isCardInHand && isMoveValid
    }
    static getPlayerHand(round: IWizRound, playerId: IPlayer["id"]): ICard[] {
        return round.playerHands[playerId]
    }
    static getTableStack(round: IWizRound): ICard[] {
        return round.tableStack.cards
    }
}