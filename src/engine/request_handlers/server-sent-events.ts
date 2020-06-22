import { Request, Response } from "express"
import IPlayer from "../lobby/interfaces/Player";

const SSE_RESPONSE_HEADER = {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'X-Accel-Buffering': 'no',
  };

export async function registerToUpdates(
    req: Request,
    res: Response,
    unsubscribe?: () => void
) {
    req.socket.setTimeout(0)
    req.socket.setNoDelay(true)
    req.socket.setKeepAlive(true)
    res.writeHead(200, SSE_RESPONSE_HEADER)

    res.write(`data: ${JSON.stringify("OK")}\n\n`)
    // TODO: Refactor it to session ID
    const clientId = req.playerId
    const newClient = {
        id: clientId,
        res
    }
    // TODO: Perhaps allow multiple responses per client
    clients.push(newClient);

    req.on('close', () => {
        // TODO: Possibly log this
        unsubscribe()
        clients = clients.filter(client => client.id !== clientId)
    })
}


export function sendUpdateState(playerIds: IPlayer["id"][], payload?: any) {
    if (!payload) {
        payload = {
            update: true
        }
    }
    clients.forEach(client => {
        if (playerIds.indexOf(client.id) !== -1) {
            client.res.write(`data: ${JSON.stringify(payload)}\n\n`)

            // TODO: notice any following problems and delete this whole nonsense
            // Without this response wasn't sent, Possibly a bug
            // Bug possibly fixed
            // Seems to not work on :3000, because of React-Scripts proxying
            // client.res.writeProcessing()
        }
    })
}
let clients: {
    // TODO: Convert to sessionId
    id: string
    res: Response
}[] = []