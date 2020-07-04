import { Request, Response } from "express"

const SSE_RESPONSE_HEADER = {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'X-Accel-Buffering': 'no',
  };
export default class ServerSentEvents {
    static async subscribeClient(
        req: Request,
        res: Response,
        /// TODO: find if next is relevant
        // next: NextFunction,
        onUnsubscribe?: () => void
    ) {
        req.socket.setTimeout(0)
        req.socket.setNoDelay(true)
        req.socket.setKeepAlive(true)
        res.writeHead(200, SSE_RESPONSE_HEADER)

        res.write(`data: ${JSON.stringify("OK")}\n\n`)
        // TODO: Refactor it to session ID
        const clientId = req.sessionID
        // TODO: Perhaps allow multiple responses per client
        const newClient = {
            id: clientId,
            res
        }
        ServerSentEvents.clients.push(newClient)

        req.on('close', () => {
            // TODO: Possibly log this
            onUnsubscribe()
            ServerSentEvents.unsubscribeClient(clientId)
        })
    }

    static unsubscribeClient(clientId: string) {
        ServerSentEvents.clients = ServerSentEvents.clients.filter(client =>
            client.id !== clientId
        )
    }
    static sendUpdateToClient(clientIds: string[], payload?: any) {
        if (!payload) {
            payload = {
                update: true
            }
        }
        const clients = ServerSentEvents.clients
        clients.forEach(client => {
            if (clientIds.indexOf(client.id) !== -1) {
                client.res.write(`data: ${JSON.stringify(payload)}\n\n`)

                // TODO: notice any following problems and delete this whole nonsense
                // client.res.writeProcessing()
                // Without this response wasn't sent, Possibly a bug
                // Seems to not work on :3000, because of React-Scripts proxying
            }
        })
    }
    private static clients: {
        // TODO: Convert to sessionId
        id: string
        res: Response
    }[] = []
}