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
        }
        return fetch('/api/room', options)
    }
}