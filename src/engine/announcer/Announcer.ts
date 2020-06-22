import {Request, Response} from 'express'
import SSE from "../request_handlers/server_sent_events"
import IPlayer from "../lobby/interfaces/Player"
import StoreSubscriber from "../data_stores/store_subscriber"
const SET_CHANNEL = '__keyevent@0__:set'
export default class Announcer {

    // static announce(playerIds: IPlayer["id"][], announcement: IAnnouncement) {
    //     sendUpdateState(playerIds, announcement)
    // }
    private static async storeSubscribe(
        gameId: string,
        playerId: IPlayer["id"],
        callback: () => void
    ) {
        StoreSubscriber.subscribe(gameId, playerId, callback)
    }
    private static async storeUnsubscribe(
        gameId: string,
        playerId: IPlayer["id"]
    ) {
        StoreSubscriber.unsubscribe(gameId, playerId)
    }
    private static async sseSubscribe(
        req: Request,
        res: Response,
        unsubscribeCallback: () => void
    ) {
        SSE.subscribeClient(req, res, unsubscribeCallback)
    }
    private static async sseUnsubscribe(playerId: string) {
        SSE.unsubscribeClient(playerId)
    }
    private static async sseSend(playerId: IPlayer["id"], payload: any) {
        SSE.sendUpdateToClient([playerId], payload)
    }
    static async subscribe(
        req: Request,
        res: Response,
        gameId: string,
        playerId: IPlayer["id"],
        payloadSource: () => Promise<any>
    ) {
        Announcer.storeSubscribe(gameId, playerId, async () => {
            Announcer.sseSend(playerId, await payloadSource())
        })
        Announcer.sseSubscribe(req, res, () => {
            Announcer.unsubscribe(gameId, playerId)
        })
    }
    static async unsubscribe(gameId: string, playerId: IPlayer["id"]) {
        Announcer.storeUnsubscribe(gameId, playerId)
        Announcer.sseUnsubscribe(playerId)
    }
}