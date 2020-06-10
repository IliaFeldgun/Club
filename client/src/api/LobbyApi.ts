import IRoom from "../engine/interfaces/Room";
import LOBBY_API_MAP from "../engine/ApiMap";

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
        return fetch(`/api/room/${roomId}/playernames`, options)
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
    
    static async getPlayerRooms(): Promise<string[]> {
        const options: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const res = await fetch(`/api/player/rooms`, options)
        if (res.status !== 200) {
            // TODO: Handle
        }

        return (await res.json()).rooms
    }
    static async getRoomLeader(roomId: string): Promise<string> {
        const options: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const res = await fetch(`/api/room/${roomId}/leader`, options)
        if (res.status !== 200) {
            // TODO: Handle
        }

        return (await res.json()).leader
    }
    static async getRoomGame(roomId: string): Promise<{id: string, name: string}>
    {
        const options: RequestInit = {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const res = await fetch(`/api/room/${roomId}/game`, options)
        if (res.status !== 200) {
            // TODO: Handle
        }

        return (await res.json()).game
    }
    static async getRoom(roomId: string): Promise<IRoom> {
        const options = LOBBY_API_MAP.ROOM.GET_ROOM.options
        const url = LOBBY_API_MAP.ROOM.GET_ROOM.url(roomId)

        const res = await fetch(url, options)
        if (res.status !== 200) {
            // TODO: Handle
        }

        return (await res.json()).room
    }
}