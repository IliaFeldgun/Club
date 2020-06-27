import { Request, Response, NextFunction } from "express"
const ID_LENGTH = "00000000-0000-0000-0000-000000000000".length
import Validator from 'validator'

export default function assertPlayer(req : Request, res: Response, next: NextFunction) {
    const cookiePlayerId = req.signedCookies.player_id
    if (cookiePlayerId && Validator.isUUID(cookiePlayerId)) {
        req.playerId = req.signedCookies.player_id
    }
    else {
        req.playerId = null
    }
    next()
}