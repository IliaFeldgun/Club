import IPlayer from "../engine/lobby/interfaces/Player";
import ICard, { Suit } from "../card_engine/interfaces/Card";
import IWizRound from "./interfaces/WizRound";
import WizStore from "./WizStore";
import IWizGame from "./interfaces/WizGame";
import LobbyMaster from "../engine/lobby/LobbyMaster";
import WizInfo from "./WizInfo";
import { PossibleMoves } from "./enums/PossibleMoves";
import WizMutator from "./WizMutator";
import IWizPlayer from "./interfaces/WizPlayer";

export default class WizMaster {
    static async getGameInstruction(gameId: IWizGame["id"]): Promise<PossibleMoves> {
        const game = await WizStore.getWizGame(gameId)
        if (game) {
            return WizInfo.getGameInstruction(game)
        }
        else {
            return null
        }
    }
    static async tryPlayBet(
        gameId: IWizGame["id"],
        bet: number,
        playerId: IPlayer["id"]
    ): Promise<boolean> {
        const game = await WizStore.getWizGame(gameId)

        if (game && WizInfo.canPlayBet(game.currentRound, bet, playerId)) {
            WizMutator.playBet(game, bet, playerId)
            return await WizStore.setWizGame(gameId, game)
        }
        else {
            return false
        }
    }
    static async tryPlayCard(
        gameId: IWizGame["id"],
        cardPlayed: ICard,
        playerId: IPlayer["id"]
    ): Promise<boolean> {
        const game = await WizStore.getWizGame(gameId)
        const round = game.currentRound
        if (game && WizInfo.canPlayCard(round, cardPlayed, playerId)) {
            WizMutator.playCard(game, cardPlayed, playerId)
            return await WizStore.setWizGame(game.id, game)
        }
        else
            return false
    }
    static async getWizPlayersByGame(gameId: IWizGame["id"]):
        Promise<IWizPlayer[]> {
            // TODO: refactor

            const game = await WizStore.getWizGame(gameId)

            if (game) {
                const round = game.currentRound
                const players = await LobbyMaster.getRoomPlayers(game.roomId)
                const playerHandSizes = WizInfo.getPlayerHandSizes(round)
                const playerBets = WizInfo.getBets(round)
                if (players) {
                    const wizPlayers = (players.map((player) => {
                        return {
                            id: player.id,
                            name: player.name,
                            score: game.playerScores[player.id].total,
                            takes: round.playerResults[player.id].successfulTakes,
                            handSize: playerHandSizes[player.id],
                            bet: playerBets[player.id]
                        }
                    }))

                    return wizPlayers
                }
                else {
                    return []
                }
            }
            else {
                return []
            }
    }
    static async dealCards(gameId: IWizGame["id"]): Promise<boolean> {
        const game = await WizStore.getWizGame(gameId)
        if (game) {
            WizMutator.dealCards(game)
            return WizStore.setWizGame(gameId, game)
        }
        else {
            return false
        }
    }
    static async setGameRound(gameId: IWizGame["id"], round: IWizRound) : Promise<boolean> {
        return WizStore.setWizRound(gameId, round)
    }
    static async getGameRound(gameId: IWizGame["id"]): Promise<IWizRound> {
        return WizStore.getWizRound(gameId)
    }
    static async isPlayerInGame(playerId: IPlayer["id"], gameId: IWizGame["id"]) : Promise<boolean> {
        const players = await WizMaster.getGamePlayerIds(gameId)
        return players.indexOf(playerId) !== -1
    }
    // static async getPlayerHandSizes(gameId: IWizGame["id"]):
    //     Promise<{ [playerId: string]: number }> {
    //     const round = await WizMaster.getGameRound(gameId)
    //     if (round) {
    //         return WizInfo.getPlayerHandSizes(round)
    //     }
    //     else
    //         return {}
    // }
    static async getPlayerHand(gameId: IWizGame["id"], playerId: IPlayer["id"]): Promise<ICard[]> {
        const round = await WizMaster.getGameRound(gameId)
        if (round) {
            return WizInfo.getPlayerHand(round, playerId)
        }
        else {
            return []
        }
    }
    static async getTableStack(gameId: IWizGame["id"]): Promise<ICard[]> {
        const round = await WizMaster.getGameRound(gameId)
        if (round) {
            return WizInfo.getTableStack(round)
        }
        else {
            return []
        }
    }
    // static async getGameBets(gameId: IWizGame["id"]):
    //     Promise<{ [playerId: string]: number}> {
    //     const round = await WizMaster.getGameRound(gameId)
    //     if (round) {
    //         return WizInfo.getBets(round)
    //     }
    //     else {
    //         return {}
    //     }
    // }
    static async getGamePlayerIds(gameId: IWizGame["id"]):
        Promise<IPlayer["id"][]> {
            const game = await WizStore.getWizGame(gameId)
            if (game) {
                return WizInfo.getGamePlayerIds(game)
            }
            else {
                return []
            }
    }
    static async getRoundStrongSuit(gameId: IWizGame["id"]):
        Promise<Suit> {
            const round = await WizMaster.getGameRound(gameId)
            if (round) {
                return WizInfo.getRoundStrongSuit(round)
            }
            else {
                return undefined
            }
        }
}