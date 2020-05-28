import IPlayer from "../engine/lobby/interfaces/Player";
import ICard from "../card_engine/interfaces/Card";
import WizGameRules from "./WizGameRules";
import IWizRound from "./interfaces/WizRound";
import WizStore from "./WizStore";
import IWizGame from "./interfaces/WizGame";
import LobbyMaster from "../engine/lobby/LobbyMaster";
import WizInfo from "./WizInfo";

export default class WizMaster {
    static playCard(round: IWizRound,
                    cardPlayed: ICard,
                    playerId: IPlayer["id"]): IWizRound
    {
        if (WizInfo.canPlayCard(round, cardPlayed, playerId)) {
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
            if (WizInfo.didAllPlayTurn(round)) {
                const requiredSuit =
                    WizGameRules.getRequiredSuit(round.tableStack.cards)

                const winningCard =
                    WizGameRules.getWinningCard(round.tableStack.cards, requiredSuit)

                const winningPlayer = WizInfo.getPlayerByCard(round, winningCard)
                // TODO: Refactor it somehow
                round.playerResults[winningPlayer].successfulTakes++

                return await WizStore.setWizRound(roundId, round)
            }
        }
    }
    static addTakeToPlayerResult(round: IWizRound, winningPlayer: IPlayer["id"]) {
        round.playerResults[winningPlayer].successfulTakes++
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
    static async getWizPlayersByGame(gameId: IWizGame["id"]):
        Promise<{id: IPlayer["id"], name: IPlayer["name"]}[]> {
            // TODO: refactor

            const game = await WizStore.getWizGame(gameId)
            if (game) {
                const players = await LobbyMaster.getRoomPlayers(game.roomId)
                if (players) {
                    const wizPlayers = (players.map((player) => {
                        return {
                            id: player.id,
                            name: player.name,
                            score: game.playerScores[player.id].total
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
    
    static async isPlayerInGame(playerId: IPlayer["id"], gameId: IWizGame["id"]) : Promise<boolean> {
        const game = await WizStore.getWizGame(gameId)

        return game && LobbyMaster.isPlayerInRoom(playerId, game.roomId)
    }

    static async getPlayerHandSizes(gameId: IWizGame["id"]):
        Promise<{ [playerId: string]: number }> {
        const round = await WizMaster.getWizRoundByGame(gameId)
        if (round) {
            return WizInfo.getPlayerHandSizes(round)
        }
        else
            return {}
    }
}