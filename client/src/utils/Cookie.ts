import Cookies from 'universal-cookie';

const PLAYER_NAME_KEY = "player_name"
const PLAYER_ID_KEY = "player_id"

function getSignedCookie(key: string): string {
    const signedCookie = getCookie(key)
    if (signedCookie) {
        return signedCookie.split(".")[0].replace("s:","")
    }
    else {
        return ""
    }
}

function getCookie(key: string): string {
    const cookies = new Cookies()
    return cookies.get(key)
}

export function getPlayerName(): string {
    return getSignedCookie(PLAYER_NAME_KEY)
}

export function getPlayerId(): string {
    return getSignedCookie(PLAYER_ID_KEY)
}