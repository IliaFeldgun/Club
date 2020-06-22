import store from "./key_value_state_store"

const SET_CHANNEL = '__keyevent@0__:set'

export default class StoreSubscriber {
    static async subscribe(
        itemId: string,
        clientId: string,
        onMessage: () => void
    ) {
        // TODO: Not async-safe
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
        // TODO: Not async-safe
        StoreSubscriber.subscriberCallbacks[itemId][clientId] = onMessage
    }
    static async unsubscribe(itemId: string, clientId: string) {
        try {
            // TODO: Not async-safe
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