import IWizGame from "./interfaces/WizGame"
import IRoom from "../engine/lobby/interfaces/Room"
import IPlayer from "../engine/lobby/interfaces/Player"
import WizGame from "./models/WizGame"
import WizScore from "./models/WizScore"
import IWizRound from "./interfaces/WizRound"
import Deck from "../card_engine/models/Deck"
import Stack from "../card_engine/models/Stack"
import WizRound from "./models/WizRound"
import { generateId } from "../engine/id_generator"
import WizStore from "./WizStore"
import WizPlayerRoundResult from "./models/WizPlayerRoundResult"
import { PossibleMoves } from "./enums/PossibleMoves"
import { AnnouncementType } from "./enums/AnnouncementType"
import IWizAnnouncement from "./interfaces/WizAnnouncement"
import WizAnnouncement from "./models/WizAnnouncement"

export default class WizBuilder {

    static async newGameState(roomId: IRoom["id"],
                        players: IPlayer["id"][]) : Promise<IWizGame["id"]>
    {
        const gameId = generateId(roomId,process.env.UUID_GAME_NAMESPACE)
        const game = new WizGame(gameId, roomId)
        players.forEach((player) => {
            game.playerOrder.push(player)
            game.playerScores[player] = new WizScore()
        })
        if (await WizStore.setWizGame(gameId, game))
            return game.id
    }
    static async newRoundState(gameId: IWizGame["id"],
                               roundNumber: number,
                               players: IPlayer["id"][],
                               firstPlayer: IPlayer["id"]): Promise<IWizRound["id"]>
    {
        const roundId = generateId(gameId + roundNumber,
                                   process.env.UUID_ROUND_NAMESPACE)

        const roundDeck = new Deck(true)
        const roundTableStack = new Stack([])

        const round = new WizRound(roundId, gameId, roundNumber, roundDeck, roundTableStack)
        round.nextMove = PossibleMoves.PLACE_BET

        round.playerOrder = WizBuilder.generatePlayerOrder(firstPlayer, players)

        players.forEach((player) => {
            round.playerHands[player] = []
            round.playerResults[player] = new WizPlayerRoundResult(roundNumber)
        })

        if (await WizStore.setWizRound(round.id, round))
            return round.id

    }
    static newAnnouncement(
        type: AnnouncementType, 
        version: number, 
        player: IPlayer["id"],
        clientMessage?: string): IWizAnnouncement {
            return new WizAnnouncement(version, type, player, clientMessage)
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