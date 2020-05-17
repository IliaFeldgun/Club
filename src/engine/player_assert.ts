import express, { Request, Response, NextFunction } from "express"
declare module 'express' {
    export interface Request {
        playerId?: string
    }
}
export default function assertPlayer(req : Request, res: Response, next: NextFunction) {
    if (req.signedCookies.player_id) {
        req.playerId = req.signedCookies.player_id
    }
    else {
        req.playerId = null
    }
    next()
}