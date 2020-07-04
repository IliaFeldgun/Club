declare namespace Express {
    interface Request {
        playerId: string
    }
    interface Session {
        playerId: string,
        playerName: string
    }
}