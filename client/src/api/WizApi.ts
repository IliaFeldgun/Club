export class WizApi {
    static sendCard(suit: string) {

    }

    static getState() {
        
    }

    static newGame(roomId: string) {
        const options: RequestInit = {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        return fetch(`/api/game/wiz/${roomId}`, options)
    }
    static getGame(gameId: string) {
        const options: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        return fetch(`/api/game/wiz/${gameId}`, options)
    }
    static async getGamePlayers(gameId: string) {
        const options: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const res = await fetch(`/api/game/wiz/${gameId}/players`, options)
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
        const res = await  fetch(`/api/game/wiz/${gameId}/handsizes`, options)
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
        const res = await fetch(`/api/game/wiz/${gameId}/hand`, options)
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
        const res = await fetch(`/api/game/wiz/${gameId}/hand`, options) 
        if (res.status !== 200) {
            // TODO: Handle
        }
        return (await res.json()).stack
    }
}