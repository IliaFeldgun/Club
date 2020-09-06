import WizBuilder from "../../wizard_game/WizBuilder"
import IRoom from "./interfaces/Room"
import WizMaster from "../../wizard_game/WizMaster"

export default class GameBuilder {
    static async newGame(room: IRoom, gameName: string): Promise<string> {
        let gameId: string

        switch (gameName) {
            case 'wizard':
                {
                    const wizGameId = await WizBuilder.newGameState(room.id, room.players)
                    const areCardsDealt = await WizMaster.dealCards(gameId)

                    if (wizGameId && areCardsDealt) {
                        gameId = wizGameId
                    }

                    break
                }
            default:
                break
        }

        return gameId
    }
}