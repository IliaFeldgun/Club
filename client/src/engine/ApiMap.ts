const GET_OPTIONS: RequestInit = {
    method: "GET",
    cache: "no-cache",
    headers: {
        'Content-Type': 'application/json'
    }
}
const POST_OPTIONS: RequestInit = {
    method: "POST",
    cache: "no-cache",
    headers: {
        'Content-Type': 'application/json'
    }
}

const LOBBY_API_MAP = {
    ROOM: {
        GET_ROOM: {
            options: GET_OPTIONS,
            url: (roomId: string) => {
                return `/api/room/${roomId}`
            }
        },
        CREATE_ROOM: {
            options: POST_OPTIONS,
            url: () => {
                return `/api/room`
            }
        },
        JOIN_ROOM: {
            options: POST_OPTIONS,
            url: (roomId: string) => {
                return `/api/room/${roomId}/join`
            }
        },
        GET_LEADER: {
            options: GET_OPTIONS,
            url: (roomId: string) => {
                return `/api/room/${roomId}/leader`
            }
        },
        GET_PLAYER_NAMES: {
            options: GET_OPTIONS,
            url: (roomId: string) => {
                return `/api/room/${roomId}/playernames`
            }
        },
        GET_GAME: {
            options: GET_OPTIONS,
            url: (roomId: string) => {
                return `/api/room/${roomId}/game`
            }
        },
    },
    PLAYER: {
        GET_ROOMS: {
            options: GET_OPTIONS,
            url: () => {
                return `/api/player/rooms`
            }
        }
    }
}

export default LOBBY_API_MAP
