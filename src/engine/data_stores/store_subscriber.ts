import store from "./key_value_state_store"

const SET_CHANNEL = '__keyevent@0__:set'

export default class StoreSubscriber {
    static async subscribe(
        itemId: string,
        clientId: string,
        callback: () => void
    ) {
        if (!StoreSubscriber.subscriberCallbacks[itemId]) {

            StoreSubscriber.subscriberCallbacks[itemId] = {}
            try {
                // TODO: Refactor
                await store.subscribe()(SET_CHANNEL, itemId)

                store.onSubscribedMessage((channel, eventItemId) => {
                    // TODO: Decide if "if" necessary
                    if (channel === SET_CHANNEL) {
                        Object.values(
                            StoreSubscriber.subscriberCallbacks[eventItemId]
                        ).forEach(
                                (func) => { func() }
                            )
                    }
                })
            }
            catch (ex) {
                // TODO: handle
            }
        }

        StoreSubscriber.subscriberCallbacks[itemId][clientId] = callback
    }
    static async unsubscribe(itemId: string, clientId: string) {
        try {
            delete StoreSubscriber.subscriberCallbacks[itemId][clientId]
            if (StoreSubscriber.subscriberCallbacks[itemId] === {})
                await store.unsubscribe()(SET_CHANNEL, itemId)
        }
        catch (ex) {
            // TODO: handle
        }
    }
    private static subscriberCallbacks: {
        [itemId: string]:
        {
            [clientId: string]: () => void
        }
    } = {}
}