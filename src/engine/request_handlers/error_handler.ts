import { Request, Response, NextFunction} from "express"
import logger from '../winston'
export function handleError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    next(err)
}
export function logError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error({err, url: req.url})
    next(err)
}
export function handleClientError(
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.status(err.httpStatusCode).send(err.clientMessage)
}
export class HttpError extends Error{
    constructor(httpStatusCode: number, clientMessage: string, message?: string) {
        super(message)
        this.httpStatusCode = httpStatusCode
        this.clientMessage = clientMessage
    }
    httpStatusCode: number
    clientMessage: string
}