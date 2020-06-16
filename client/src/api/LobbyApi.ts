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
        const options = LOBBY_API_MAP.ROOM.CREATE_ROOM.options
        const url = LOBBY_API_MAP.ROOM.CREATE_ROOM.url()
        return fetch(url, options)
    }

    static async getRoomPlayers(roomId: string) {
        const options = LOBBY_API_MAP.ROOM.GET_PLAYER_NAMES.options
        const url = LOBBY_API_MAP.ROOM.GET_PLAYER_NAMES.url(roomId)
        return fetch(url, options)
    }

    static async joinRoom(roomId: string) {
        const options = LOBBY_API_MAP.ROOM.JOIN_ROOM.options
        const url = LOBBY_API_MAP.ROOM.JOIN_ROOM.url(roomId)
        return fetch(url, options)
    }
    
    static async getPlayerRooms(): Promise<string[]> {
        const options = LOBBY_API_MAP.PLAYER.GET_ROOMS.options
        const url = LOBBY_API_MAP.PLAYER.GET_ROOMS.url()
        const res = await fetch(url, options)
        if (res.status !== 200) {
            // TODO: Handle
        }

        return (await res.json()).rooms
    }
    static async getRoomLeader(roomId: string): Promise<string> {
        const options = LOBBY_API_MAP.ROOM.GET_LEADER.options
        const url = LOBBY_API_MAP.ROOM.GET_LEADER.url(roomId)
        const res = await fetch(url, options)
        if (res.status !== 200) {
            // TODO: Handle
        }

        return (await res.json()).leader
    }
    static async getRoomGame(roomId: string): Promise<{id: string, name: string}>
    {
        const options = LOBBY_API_MAP.ROOM.GET_GAME.options
        const url = LOBBY_API_MAP.ROOM.GET_GAME.url(roomId)
        const res = await fetch(url, options)
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
    static listenToUpdateEvent() {
        return new EventSource('/api/room/updates')
    }
}