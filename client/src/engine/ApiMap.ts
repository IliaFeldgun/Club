const GET_ROOM_OPTIONS: RequestInit = {
    method: "GET",
    cache: "no-cache",
    headers: {
        'Content-Type': 'application/json'
    }
}

const LOBBY_API_MAP = {
    ROOM: {
        GET_ROOM: {
            options: GET_ROOM_OPTIONS,
            url: (roomId: string) => {
                return `/api/room/${roomId}`
            }
        }
    }
}

export default LOBBY_API_MAP
