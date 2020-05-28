import store from "../engine/key_value_state_store"
import IWizGame from "./interfaces/WizGame"
import IWizRound from "./interfaces/WizRound"

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
    static async getWizRound(roundId: IWizRound["id"]): Promise<IWizRound> {
        try {
            const round: IWizRound = JSON.parse(await store.getAsync()(roundId))

            return round
        }
        catch(error) {
            // TODO: Log it
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
    static async setWizRound(roundId: IWizRound["id"], round: IWizRound): Promise<boolean> {
        try {
            const storeResponse = await store.setAsync()(roundId, JSON.stringify(round))
            return true
        }
        catch(error) {
            // TODO: Log it
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
    static async deleteWizRound(roundId: IWizRound["id"]): Promise<boolean> {
        try {
            const storeResponse = await store.deleteAsync()(roundId)
            return true
        }
        catch(error) {
            // TODO: Log it
            return false
        }
    }

}