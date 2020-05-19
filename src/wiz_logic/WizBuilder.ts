import IWizGame from "./models/WizGame"
import IRoom from "../engine/room_logic/models/Room"
import IPlayer from "../engine/room_logic/models/Player"
import WizGame from "./logic/WizGame"
import { WizScore } from "./logic/WizScore"
import IWizRound from "./models/WizRound"
import Deck from "../card_logic/logic/Deck"
import Stack from "../card_logic/logic/Stack"
import WizRound from "./logic/WizRound"

export default class WizBuilder {
    
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
                        players: IPlayer["id"][],
                        firstPlayer: IPlayer["id"]) {
        const roundDeck = new Deck(true)
        const roundTableStack = new Stack([])

        const round = new WizRound(roundId, gameId, roundDeck, roundTableStack)

        players.forEach((player) => {
            // round.playerBets[player] =
            round.playerHands[player] = []
        })
    }
    static generatePlayerOrder(firstPlayer: IPlayer["id"], players: IPlayer["id"][]) {
        const newOrder = [...players]

        while (newOrder.indexOf(firstPlayer) > 0) {
            newOrder.push(newOrder.shift())
        }
    }

}