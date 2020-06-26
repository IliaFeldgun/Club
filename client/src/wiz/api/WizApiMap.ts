import { AxiosRequestConfig } from 'axios'
import ICard from '../../interfaces/Card'

// functions are to avoid cloning
function POST_CONFIG(): AxiosRequestConfig {
    return {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    }
}
function GET_CONFIG(): AxiosRequestConfig {
    return {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }
}
const WIZ_API_MAP = {
    NEW_GAME: {
        url: (roomId: string) => {
            return `/api/game/wizard/${roomId}`
        },
        config: POST_CONFIG
    },
    GET_GAME_INSTRUCTIONS: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}`
        },
        config: GET_CONFIG
    },
    GET_GAME_PLAYERS: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}/players`
        },
        config: GET_CONFIG
    },
    GET_NEXT_PLAYER: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}/nextplayer`
        },
        config: GET_CONFIG
    },
    GET_PLAYER_HAND: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}/hand`
        },
        config: GET_CONFIG
    },
    GET_TABLE_STACK: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}/stack`
        },
        config: GET_CONFIG
    },
    GET_STRONG_SUIT: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}/kozer`
        },
        config: GET_CONFIG
    },
    SEND_CARD: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}/play`
        },
        config: (card: ICard) => {
            return {...POST_CONFIG(), data: JSON.stringify(card)}
        }
    },
    SEND_BET: {
        url: (gameId: string, bet: number) => {
            return `/api/game/wizard/${gameId}/bet/${bet}`
        },
        config: POST_CONFIG
    }
}

export default WIZ_API_MAP