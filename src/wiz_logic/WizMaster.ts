import IPlayer from "../engine/room_logic/models/Player";
import ICard from "../card_logic/models/Card";
import WizGameRules from "./logic/WizGameRules";
import IWizRound from "./models/WizRound";

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
            //if (WizMaster.areAllHandsEmpty(round))
            return round
        }
        else 
            return null
    }
    static canPlayCard(round: IWizRound, 
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
    static advanceRound(round: IWizRound) {
        
        this.assertWinner(round)

        round.turnNumber++
    }
    static assertWinner(round: IWizRound) {
        if (WizMaster.didAllPlay(round)) {
            const requiredSuit = 
                WizGameRules.getRequiredSuit(round.tableStack.cards)

            const winningCard = 
                WizGameRules.getWinningCard(round.tableStack.cards, requiredSuit)

            const winningPlayer = WizMaster.getPlayerByCard(round, winningCard)

            round.playerResults[winningPlayer].addTake()
        }
    }
    static getPlayerByCard(round: IWizRound, card: ICard): IPlayer["id"] {
        const cardIndex = round.tableStack.indexOf(card)
        return round.playerOrder[cardIndex]
    }
    static getCurrentPlayer(round: IWizRound) {
        const currentPlayerNum = round.turnNumber % round.playerOrder.length
        
        return round.playerOrder[currentPlayerNum - 1]
    }
    static didAllPlay(round: IWizRound): boolean {
        return round.turnNumber % round.playerOrder.length == 0

    }
    static areAllHandsEmpty(round: IWizRound): boolean {
        const playerHands = Object.entries(round.playerHands)
        const allEmpty = !playerHands.some(([player,cards]) => cards.length)

        return allEmpty
    }
}