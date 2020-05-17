import express, { Request, Response, NextFunction } from "express"

export default function assertPlayer(req : Request, res: Response, next: NextFunction) {
    if (req.signedCookies.player_id) {
        req.playerId = req.signedCookies.player_id
    }
    else {
        req.playerId = null
    }
    next()
}