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
    static getGamePlayers(gameId: string) {
        const options: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        return fetch(`/api/game/wiz/${gameId}/players`, options)
    }
}