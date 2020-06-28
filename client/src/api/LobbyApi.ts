import axios, { AxiosError } from "axios"
import IRoom from "../engine/interfaces/Room";
import LOBBY_API_MAP from "../engine/LobbyApiMap";

export default class LobbyApi {
    static async newPlayer(playerName: string): Promise<boolean> {
        const url = LOBBY_API_MAP.PLAYER.CREATE_PLAYER.url()
        const config = LOBBY_API_MAP.PLAYER.CREATE_PLAYER.config(playerName)
        try {
            const response = await axios(url, config)
            return response.data.playerId !== undefined
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }

    static async newRoom(): Promise<string> {
        const url = LOBBY_API_MAP.ROOM.CREATE_ROOM.url()
        const config = LOBBY_API_MAP.ROOM.CREATE_ROOM.config()
        try {
            const response = await axios(url, config)
            return response.data.roomId
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }

    static async getRoomPlayerNames(roomId: string): Promise<string[]> {
        const url = LOBBY_API_MAP.ROOM.GET_PLAYER_NAMES.url(roomId)
        const config = LOBBY_API_MAP.ROOM.GET_PLAYER_NAMES.config()
        try {
            const response = await axios(url, config)
            return response.data.playerNames
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }

    static async joinRoom(roomId: string): Promise<string>{
        const url = LOBBY_API_MAP.ROOM.JOIN_ROOM.url(roomId)
        const config = LOBBY_API_MAP.ROOM.JOIN_ROOM.config()
        try {
            const response = await axios(url, config)
            return response.data.roomId
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    
    static async getPlayerRooms(): Promise<string[]> {
        const url = LOBBY_API_MAP.PLAYER.GET_ROOMS.url()
        const config = LOBBY_API_MAP.PLAYER.GET_ROOMS.config()
        try {
            const response = await axios(url, config)
            return response.data.rooms
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    static async getRoomLeader(roomId: string): Promise<string> {
        const url = LOBBY_API_MAP.ROOM.GET_LEADER.url(roomId)
        const config = LOBBY_API_MAP.ROOM.GET_LEADER.config()
        try {
            const response = await axios(url, config)
            return response.data.leader
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    static async getRoomGame(roomId: string): Promise<{id: string, name: string}>
    {
        const url = LOBBY_API_MAP.ROOM.GET_GAME.url(roomId)
        const config = LOBBY_API_MAP.ROOM.GET_GAME.config()
        try {
            const response = await axios(url, config)
            return response.data.game
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    static async getRoom(roomId: string): Promise<IRoom> {
        const url = LOBBY_API_MAP.ROOM.GET_ROOM.url(roomId)
        const config = LOBBY_API_MAP.ROOM.GET_ROOM.config()

        try {
            const response = await axios(url, config)
            return response.data.room
        }
        catch (ex) {
            const error: AxiosError = ex
            // TODO: Handle            
            throw error
        }
    }
    static listenToUpdateEvent() {
        return new EventSource('/api/room/updates')
    }
}