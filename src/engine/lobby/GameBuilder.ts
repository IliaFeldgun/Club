import WizBuilder from "../../wizard_game/WizBuilder"
import IRoom from "./interfaces/Room"
import WizMaster from "../../wizard_game/WizMaster"

export default class GameBuilder {
    static gameBuilders = {
        wizard: async (room: IRoom): Promise<string> => {
            const gameId = await WizBuilder.newGameState(room.id, room.players)
            if (gameId) {
                const areCardsDealt = await WizMaster.dealCards(gameId)

                if (areCardsDealt) {
                    return gameId
                }
                else {
                    return undefined
                }
            }
        }
    } as {
        [key: string]: (room: IRoom) => Promise<string>
    }

    static async newGame(room: IRoom, gameName: string): Promise<string> {
        if (GameBuilder.isValidGame(gameName)) {
            return GameBuilder.gameBuilders[gameName](room)
        }
        else {
            return undefined
        }
    }

    static isValidGame(gameName: string): boolean {
        return Object.keys(GameBuilder.gameBuilders).indexOf(gameName) !== -1
    }

    static getAvailableGames(): string[] {
        return Object.keys(GameBuilder.gameBuilders)
    }
}