import { Request, Response, NextFunction } from "express"

export default function assertPlayer(req: Request, res: Response, next: NextFunction) {
    req.playerId = req.session.playerId
    next()
}