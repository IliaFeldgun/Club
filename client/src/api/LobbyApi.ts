export default class LobbyApi {
    static async newPlayer(playerName: string) {
        const data = new URLSearchParams();
        data.append("playerName", playerName)

        const options: RequestInit = { 
            method: "POST",
            cache: "no-cache",
            body: data
        }
        return fetch('/api/player', options)
    }

    static async newRoom() {
        const options: RequestInit = {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        return fetch('/api/room', options)
    }

    static async getRoomPlayers(roomId: string) {
        const options: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        return fetch(`/api/room/${roomId}/players`, options)
    }

    static async joinRoom(roomId: string) {
        const options: RequestInit = {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }

        return fetch(`/api/room/${roomId}/join`, options)
    }
}