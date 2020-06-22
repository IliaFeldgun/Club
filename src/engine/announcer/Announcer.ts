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
        if (!Announcer.subscriberCallbacks[gameId]) {
            Announcer.subscriberCallbacks[gameId] = {}
            try {
                // TODO: Refactor
                await store.subscribe()(SET_CHANNEL, gameId)

                store.onSubscribedMessage((channel, message) => {
                    // TODO: Decide if "if" necessary
                    if (channel === SET_CHANNEL) {
                        Object.values(Announcer.subscriberCallbacks[message]).forEach((func) => {
                            func()
                        })
                    }
                })
            }
            catch (ex) {
                // TODO: handle
            }
        }

        Announcer.subscriberCallbacks[gameId][playerId] = callback
    }
    static async unsubscribe(gameId: string, playerId: IPlayer["id"]) {
        try {
            delete Announcer.subscriberCallbacks[gameId][playerId]
            if (Announcer.subscriberCallbacks[gameId] === {})
                await store.unsubscribe()(SET_CHANNEL, gameId)
        }
        catch (ex) {
            // TODO: handle
        }
    }
    private static subscriberCallbacks: {
        [gameId: string]:
        {
            [playerId: string]: () => void
        }
    } = {}
}