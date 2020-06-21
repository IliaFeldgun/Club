import store from "../data_stores/key_value_state_store"
import IPlayer from "../lobby/interfaces/Player"

const SET_CHANNEL = '__keyevent@0__:set'
export default class Announcer {

    // static announce(playerIds: IPlayer["id"][], announcement: IAnnouncement) {
    //     sendUpdateState(playerIds, announcement)
    // }
    static async subscribe(
        gameId: string,
        playerId: IPlayer["id"],
        callback: () => void
    ) {
        try {
            // TODO: Refactor
            if (Object.keys(Announcer.gameCallbacks).indexOf(gameId) === -1)
            {
                await store.subscribe()(SET_CHANNEL, gameId)
                Announcer.gameCallbacks[gameId] = {}
            }

            Announcer.gameCallbacks[gameId][playerId] = callback
        }
        catch (ex) {
            // TODO: handle
        }
        store.onSubscribedMessage((channel, message) => {
            // TODO: Decide if "if" necessary
            if (channel === SET_CHANNEL) {
                Object.values(Announcer.gameCallbacks[message]).forEach((func) => {
                    func()
                })
            }
        })
    }
    static async unsubscribe(gameId: string, playerId: IPlayer["id"]) {
        try {
            delete Announcer.gameCallbacks[gameId][playerId]
            if (Announcer.gameCallbacks[gameId] === {})
                await store.unsubscribe()(SET_CHANNEL, gameId)
        }
        catch (ex) {
            // TODO: handle
        }
    }
    static gameCallbacks: {
        [gameId: string]:
        {
            [playerId: string]: () => void
        }
    } = {}
}