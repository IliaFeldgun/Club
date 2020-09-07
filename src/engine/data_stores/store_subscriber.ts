import store from "./key_value_state_store"
import logger from '../winston'

const SET_CHANNEL = '__keyevent@0__:set'

export default class StoreSubscriber {
    static async subscribe(
        itemId: string,
        clientId: string,
        onMessage: () => void
    ) {
        logger.verbose("Store subscription process started", { itemId, clientId })

        await StoreSubscriber.subscribeToItem(itemId)
        StoreSubscriber.addSubscriber(itemId, clientId, onMessage)

        logger.verbose("Store subscription process ended", { itemId, clientId })
    }
    static async unsubscribe(itemId: string, clientId: string) {
        // TODO: Not async-safe
        logger.verbose("Unsubscription process started", { itemId, clientId })

        StoreSubscriber.removeSubscriber(itemId, clientId)
        StoreSubscriber.cleanSubscription(itemId)

        logger.verbose("Unsubscription process ended", { itemId, clientId })

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
                    logger.verbose(`Message received from store`, { channel, eventItemId })

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

                logger.verbose(`Successfully subscribed to store key`, { itemId })
            }
            catch (ex) {
                logger.error(`Failed to subscribe to store key ${itemId}; `, ex)
            }
        }
        else {
            logger.verbose(`Already subscribed to store key`, { itemId })
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
            logger.verbose(`Client subscribed to key`, { itemId, clientId })
            return true
        }
        else {
            logger.warn(`Item doesn't exist, client can't subscribe`, { itemId, clientId })
            return false
        }
    }
    private static async cleanSubscription(itemId: string): Promise<boolean> {
        try {
            if (StoreSubscriber.subscriberCallbacks[itemId] === {}) {
                await store.unsubscribe()(SET_CHANNEL, itemId)
                delete StoreSubscriber.subscriberCallbacks[itemId]
                logger.verbose(`Subscription cleaned`, { itemId })
                return true
            }
            else {
                logger.verbose(`Subscription in use, no need to clean`, { itemId })
                return true
            }
        }
        catch (ex) {
            logger.error(`Error unsubscribing from store key ${itemId}`)
            return false
        }
    }
    private static removeSubscriber(itemId: string, clientId: string): boolean {
        if (StoreSubscriber.subscriberCallbacks[itemId]) {
            delete StoreSubscriber.subscriberCallbacks[itemId][clientId]
            logger.verbose(`Client unsubscribed from key`, { itemId, clientId })
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