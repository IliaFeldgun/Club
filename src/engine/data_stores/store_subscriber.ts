import store from "./key_value_state_store"

const SET_CHANNEL = '__keyevent@0__:set'

export default class StoreSubscriber {
    static async subscribe(
        itemId: string,
        clientId: string,
        onMessage: () => void
    ) {
        await StoreSubscriber.subscribeToItem(itemId)
        StoreSubscriber.addSubscriber(itemId, clientId, onMessage)
    }
    static async unsubscribe(itemId: string, clientId: string) {
        // TODO: Not async-safe
        StoreSubscriber.removeSubscriber(itemId, clientId)
        StoreSubscriber.cleanSubscription(itemId)
    }
    private static async subscribeToItem(itemId: string): Promise<boolean> {
        // TODO: Not async-safe
        if (!StoreSubscriber.subscriberCallbacks[itemId]) {

            StoreSubscriber.subscriberCallbacks[itemId] = {}
            try {
                // TODO: Refactor
                await store.subscribe()(SET_CHANNEL, itemId)

                store.onSubscribedMessage((channel, eventItemId) => {
                    // TODO: Rogue messages appearing, sub seems to not be per key
                    if (
                        channel === SET_CHANNEL &&
                        StoreSubscriber.subscriberCallbacks[eventItemId]
                    ) {
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
        else {
            return true
        }
    }
    private static addSubscriber(
        itemId: string,
        clientId: string,
        onMessage: () => void
    ): boolean {
        if (StoreSubscriber.subscriberCallbacks[itemId]) {
            StoreSubscriber.subscriberCallbacks[itemId][clientId] = onMessage
            return false
        }
        else {
            return false
        }
    }
    private static async cleanSubscription(itemId: string): Promise<boolean>{
        try {
            if (StoreSubscriber.subscriberCallbacks[itemId] === {}) {
                await store.unsubscribe()(SET_CHANNEL, itemId)
                delete StoreSubscriber.subscriberCallbacks[itemId]
                return true
            }
            else {
                return true
            }
        }
        catch (ex) {
            // TODO: handle
            return false
        }
    }
    private static removeSubscriber(itemId: string, clientId: string): boolean {
        if (StoreSubscriber.subscriberCallbacks[itemId]) {
            delete StoreSubscriber.subscriberCallbacks[itemId][clientId]
            return true
        }
        else {
            return true
        }
    }
    private static subscriberCallbacks: {
        [itemId: string]:
        {
            [clientId: string]: () => void
        }
    } = {}
}