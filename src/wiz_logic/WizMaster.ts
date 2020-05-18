import WizGame from "./logic/WizGame";
import IWizGame from "./models/WizGame";
import Deck from "../card_logic/logic/Deck";
import Stack from "../card_logic/logic/Stack";
import IRoom from "../engine/room_logic/models/Room";
import IPlayer from "../engine/room_logic/models/Player";
import { WizScore } from "./logic/WizScore";
import WizPlayerRoundResult from "./logic/WizPlayerRoundResult";
import ICard from "../card_logic/models/Card";
import WizGameRules from "./logic/WizGameRules";
import IWizRound from "./models/WizRound";
import WizRound from "./logic/WizRound";
import WizBet from "./logic/WizBet";

export default class WizMaster {
    static newGameState(gameId: IWizGame["id"],
                        roomId: IRoom["id"],
                        players: IPlayer["id"][]) : IWizGame {


        const game = new WizGame(gameId, roomId)
        players.forEach((player) => {
            game.playerScores[player] = new WizScore()
        })

        return game
    }
    static newGameRound(roundId: IWizRound["id"],
                        gameId: IWizGame["id"],
                        players: IPlayer["id"][]) {
        const roundDeck = new Deck(true)
        const roundTableStack = new Stack([])

        const round = new WizRound(roundId, gameId, roundDeck, roundTableStack)

        players.forEach((player) => {
            // round.playerBets[player] =
            round.playerHands[player] = new Stack([])
        })
    }

    static canPlayCard(round: IWizRound,
                       cardPlayed: ICard,
                       playerId: IPlayer["id"]): boolean {
        const isCardInHand = round.playerHands[playerId].contains(cardPlayed)

        const playerCards = round.playerHands[playerId].cards
        const topCard = round.tableStack.top()
        const requiredSuit = WizGameRules.getRequiredSuit(round.tableStack.cards)
        const isMoveValid = WizGameRules.checkPlayValidity(cardPlayed,
            playerCards, topCard, requiredSuit)

        return isCardInHand && isMoveValid

    }
    static playCard(round: IWizRound,
                    cardPlayed: ICard,
                    playerId: IPlayer["id"]): IWizRound {

        if (this.canPlayCard(round, cardPlayed, playerId)) {
            const cardsLeft = round.playerHands[playerId].cards.filter(card =>
                card.equals(cardPlayed))

            round.playerHands[playerId].cards = cardsLeft

            this.advanceRound(round)
        }
        else {
            return null
        }
    }
    static advanceRound(round: IWizRound) {
        const newRound = {}
    }
}