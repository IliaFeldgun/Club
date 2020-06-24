import { AxiosRequestConfig } from 'axios'
import ICard from '../../interfaces/Card'

const POST_CONFIG: AxiosRequestConfig = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    }
}
const GET_CONFIG: AxiosRequestConfig = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    }
}
const WIZ_API_MAP = {
    NEW_GAME: {
        url: (roomId: string) => {
            return `/api/game/wizard/${roomId}`
        },
        config: () => {
            return {...POST_CONFIG}
        }
    },
    GET_GAME_INSTRUCTIONS: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}`
        },
        config: () => {
            return {...GET_CONFIG}
        }
    },
    GET_GAME_PLAYERS: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}/players`
        },
        config: () => {
            return {...GET_CONFIG}
        }
    },
    GET_NEXT_PLAYER: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}/nextplayer`
        },
        config: () => {
            return {...GET_CONFIG}
        }
    },
    GET_PLAYER_HAND: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}/hand`
        },
        config: () => {
            return {...GET_CONFIG}
        }
    },
    GET_TABLE_STACK: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}/stack`
        },
        config: () => {
            return {...GET_CONFIG}
        }
    },
    GET_STRONG_SUIT: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}/kozer`
        },
        config: () => {
            return {...GET_CONFIG}
        }
    },
    SEND_CARD: {
        url: (gameId: string) => {
            return `/api/game/wizard/${gameId}/play`
        },
        config: (card: ICard) => {
            return {...POST_CONFIG, data: JSON.stringify(card)}
        }
    },
    SEND_BET: {
        url: (gameId: string, bet: number) => {
            return `/api/game/wizard/${gameId}/bet/${bet}`
        },
        config: () => {
            return {...POST_CONFIG}
        }
    }
}

export default WIZ_API_MAP