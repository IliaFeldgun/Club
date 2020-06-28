import axios, { AxiosError } from "axios"
import ICard, { Suit } from "../../interfaces/Card"
import { PossibleMoves } from "../interfaces/PossibleMoves"
import IWizPlayer from "../interfaces/WizPlayer"
import WIZ_API_MAP from "./WizApiMap"

export class WizApi {
    static async newGame(roomId: string): Promise<string> {
        const url = WIZ_API_MAP.NEW_GAME.url(roomId)
        const config = WIZ_API_MAP.NEW_GAME.config()
        try {
            const response = await axios(url, config)
            return response.data.gameId
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    static async getGameInstructions(gameId: string): Promise<PossibleMoves> {
        const url = WIZ_API_MAP.GET_GAME_INSTRUCTIONS.url(gameId)
        const config = WIZ_API_MAP.GET_GAME_INSTRUCTIONS.config()
        try {
            const response = await axios(url, config)
            return response.data.instruction
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    static async getGamePlayers(gameId: string): Promise<IWizPlayer[]> {
        const url = WIZ_API_MAP.GET_GAME_PLAYERS.url(gameId)
        const config = WIZ_API_MAP.GET_GAME_PLAYERS.config()
        try {
            const response = await axios(url, config)
            return response.data.players
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    static async getNextPlayer(gameId: string): Promise<string> {
        const url = WIZ_API_MAP.GET_NEXT_PLAYER.url(gameId)
        const config = WIZ_API_MAP.GET_NEXT_PLAYER.config()
        try {
            const response = await axios(url, config)
            return response.data.nextPlayer
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    static async getPlayerHand(gameId: string) {
        const url = WIZ_API_MAP.GET_PLAYER_HAND.url(gameId)
        const config = WIZ_API_MAP.GET_PLAYER_HAND.config()
        try {
            const response = await axios(url, config)
            return response.data.playerHand
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    static async getTableStack(gameId: string) {
        const url = WIZ_API_MAP.GET_TABLE_STACK.url(gameId)
        const config = WIZ_API_MAP.GET_TABLE_STACK.config()
        try {
            const response = await axios(url, config)
            return response.data.stack
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    static async getStrongSuit(gameId: string):
        Promise<Suit> {        
            const url = WIZ_API_MAP.GET_STRONG_SUIT.url(gameId)
            const config = WIZ_API_MAP.GET_STRONG_SUIT.config()
            try {
                const response = await axios(url, config)
                return response.data.strongSuit
            }
            catch (ex) {
                const error: AxiosError = ex
                // TODO: Handle            
                throw error
            }
    }
    static async sendCard(gameId: string, card: ICard): Promise<boolean> {
        const url = WIZ_API_MAP.SEND_CARD.url(gameId)
        const config = WIZ_API_MAP.SEND_CARD.config(card)
        try {
            const response = await axios(url, config)
            return response.data.isCardPlayed
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    static async sendBet(gameId: string, bet: number): Promise<boolean> {
        const url = WIZ_API_MAP.SEND_BET.url(gameId, bet)
        const config = WIZ_API_MAP.SEND_BET.config()
        try {
            const response = await axios(url, config)
            return response.data.isBetPlayed
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    static listenToUpdateEvent(gameId: string) {
        return new EventSource(`/api/game/wizard/${gameId}/updates`)
    }
}