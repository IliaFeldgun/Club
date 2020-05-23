import IWizGame from "./models/WizGame"
import IRoom from "../engine/lobby_logic/models/Room"
import IPlayer from "../engine/lobby_logic/models/Player"
import WizGame from "./logic/WizGame"
import WizScore from "./logic/WizScore"
import IWizRound from "./models/WizRound"
import Deck from "../card_logic/logic/Deck"
import Stack from "../card_logic/logic/Stack"
import WizRound from "./logic/WizRound"
import { generateId } from "../engine/id_generator"

export default class WizBuilder {

    static newGameState(roomId: IRoom["id"],
                        players: IPlayer["id"][]) : IWizGame
    {
        const gameId = generateId(roomId,process.env.UUID_GAME_NAMESPACE)
        const game = new WizGame(gameId, roomId)
        players.forEach((player) => {
            game.playerScores[player] = new WizScore()
        })

        return game
    }
    static newRoundState(gameId: IWizGame["id"],
                         roundNumber: number,
                         players: IPlayer["id"][],
                         firstPlayer: IPlayer["id"]): IWizRound
    {

        const roundId = generateId(gameId + 1,
                                   process.env.UUID_ROUND_NAMESPACE)

        const roundDeck = new Deck(true)
        const roundTableStack = new Stack([])

        const round = new WizRound(roundId, gameId, roundNumber, roundDeck, roundTableStack)

        round.playerOrder = WizBuilder.generatePlayerOrder(firstPlayer, players)

        players.forEach((player) => {
            round.playerHands[player] = []
        })

        return round
    }

    static generatePlayerOrder(firstPlayer: IPlayer["id"],
                               players: IPlayer["id"][]): IPlayer["id"][]
    {
        const newOrder = [...players]

        while (newOrder.indexOf(firstPlayer) > 0) {
            newOrder.push(newOrder.shift())
        }

        return newOrder
    }
}