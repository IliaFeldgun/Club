import { Request, Response } from 'express'
import SSE from "../request_handlers/server_sent_events"
import StoreSubscriber from "../data_stores/store_subscriber"

export default class Announcer {
    private static async storeSubscribe(
        gameId: string,
        sessionId: string,
        onMessage: () => void
    ) {
        StoreSubscriber.subscribe(gameId, sessionId, onMessage)
    }
    private static async storeUnsubscribe(
        gameId: string,
        sessionId: string
    ) {
        StoreSubscriber.unsubscribe(gameId, sessionId)
    }
    private static async sseSubscribe(
        req: Request,
        res: Response,
        onUnsubscribe: () => void
    ) {
        SSE.subscribeClient(req, res, onUnsubscribe)
    }
    private static async sseUnsubscribe(sessionId: string) {
        SSE.unsubscribeClient(sessionId)
    }
    private static async sseSend(sessionId: string, payload: any) {
        SSE.sendUpdateToClient([sessionId], payload)
    }
    static async subscribe(
        req: Request,
        res: Response,
        gameId: string,
        payloadSource: () => Promise<any>
    ) {
        const sessionId = req.sessionID
        Announcer.storeSubscribe(gameId, sessionId, async () => {
            Announcer.sseSend(sessionId, await payloadSource())
        })
        Announcer.sseSubscribe(req, res, () => {
            Announcer.unsubscribe(gameId, sessionId)
        })
    }
    static async unsubscribe(gameId: string, sessionId: string) {
        Announcer.storeUnsubscribe(gameId, sessionId)
        Announcer.sseUnsubscribe(sessionId)
    }
}