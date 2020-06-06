import ICard, { Suit } from "../interfaces/Card"
import { PossibleMoves } from "../interfaces/PossibleMoves"

export class WizApi {
    static newGame(roomId: string) {
        const options: RequestInit = {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        return fetch(`/api/game/wizard/${roomId}`, options)
    }
    static async getGameInstructions(gameId: string): Promise<PossibleMoves> {
        const options: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const res = await fetch(`/api/game/wizard/${gameId}`, options) 
        if (res.status !== 200) {
            // TODO: Handle
        }
        return (await res.json()).instruction
    }
    static async getGamePlayers(gameId: string) {
        const options: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const res = await fetch(`/api/game/wizard/${gameId}/players`, options)
        if (res.status !== 200) {
            // TODO: Handle
        }

        return (await res.json()).players
    }
    static async getPlayerHandSizes(gameId: string) {
        const options: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const res = await  fetch(`/api/game/wizard/${gameId}/handsizes`, options)
        if (res.status !== 200) {
            // TODO: Handle
        }

        return (await res.json()).playerHandSizes
    }
    static async getPlayerHand(gameId: string) {
        const options: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const res = await fetch(`/api/game/wizard/${gameId}/hand`, options)
        if (res.status !== 200) {
            // TODO: Handle
        }

        return (await res.json()).playerHand
    }
    static async getTableStack(gameId: string) {
        const options: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const res = await fetch(`/api/game/wizard/${gameId}/stack`, options) 
        if (res.status !== 200) {
            // TODO: Handle
        }
        return (await res.json()).stack
    }
    static async sendCard(gameId: string, card: ICard): Promise<boolean> {
        const options: RequestInit = {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(card)
        }

        const res = await fetch(`/api/game/wizard/${gameId}/play`, options)
        if (res.status === 200) {
            return true
        }
        else {
            return false
        }
    }
    static async sendBet(gameId: string, bet: number): Promise<boolean> {
        const options: RequestInit = {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await fetch(`/api/game/wizard/${gameId}/bet/${bet}`, options)
        if (res.status === 200) {
            return true
        }
        else {
            return false
        }
    }
    static async getPlayerBets(gameId: string): 
        Promise<{ [playerId: string]: number }> {
            const options: RequestInit = {
                method: "GET",
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            const res = await fetch(`/api/game/wizard/${gameId}/bets`, options)
            if (res.status !== 200) {
                // TODO: Handle
            }
    
            return (await res.json()).bets
    }
    static async getStrongSuit(gameId: string):
        Promise<Suit> {
            const options: RequestInit = {
                method: "GET",
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            const res = await fetch(`/api/game/wizard/${gameId}/kozer`, options)
            if (res.status !== 200) {
                // TODO: Handle
            }
    
            return (await res.json()).strongSuit
        }
    static listenToUpdateEvent() {
        return new EventSource('/api/game/wizard/updates')
    }
}