import IWizGame from "./interfaces/WizGame"
import IWizRound from "./interfaces/WizRound"

import store from "../engine/data_stores/key_value_state_store"

export default class WizStore {
    static async getWizGame(gameId: IWizGame["id"]): Promise<IWizGame> {
        try {
            const game: IWizGame = JSON.parse(await store.getAsync()(gameId))

            return game
        }
        catch(error) {
            // TODO: Log it
            return undefined
        }
    }
    static async getWizRound(gameId: IWizGame["id"]): Promise<IWizRound> {
        const game: IWizGame = await WizStore.getWizGame(gameId)
        if (game) {
            return game.currentRound
        }
        else {
            return undefined
        }
    }
    static async setWizGame(gameId: IWizGame["id"], game: IWizGame): Promise<boolean> {
        try {
            const storeResponse = await store.setAsync()(gameId, JSON.stringify(game))
            return true
        }
        catch(error) {
            // TODO: Log it
            return false
        }
    }
    static async setWizRound(gameId: IWizGame["id"], round: IWizRound): Promise<boolean> {
        const game: IWizGame = await WizStore.getWizGame(gameId)
        if (game) {
            game.currentRound = round
            return await WizStore.setWizGame(gameId, game)
        }
        else {
            return false
        }
    }
    static async deleteWizGame(gameId: IWizGame["id"]): Promise<boolean> {
        try {
            const storeResponse = await store.deleteAsync()(gameId)
            return true
        }
        catch(error) {
            // TODO: Log it
            return false
        }
    }
}