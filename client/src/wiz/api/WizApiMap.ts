const WIZ_API_MAP = {
    WIZ: {
        SEND_CARD: {
            URL: "/api/game/wizard",
            METHOD: "POST"
        }
    },
    LOBBY: {
        CREATE_PLAYER: {
            URL: "/api/player",
            METHOD: "POST"
        },
        DELETE_PLAYER: {
            URL: "/api/player",
            METHO: "DELETE"
        },
    }
}

export default WIZ_API_MAP