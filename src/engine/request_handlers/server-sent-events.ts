import { Request, Response } from "express"
import IPlayer from "@engine/lobby/interfaces/Player";

const SSE_RESPONSE_HEADER = {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'X-Accel-Buffering': 'no',
  };

export async function registerToUpdates(req: Request, res: Response) {
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
        clients = clients.filter(client => client.id !== clientId)
    })
}


export function sendUpdateState(playerIds: IPlayer["id"][], data?: any) {
    if (!data) {
        data = {
            update: true
        }
    }
    clients.forEach(client => {
        if (playerIds.indexOf(client.id) !== -1) {
            client.res.write(`data: ${JSON.stringify(data)}\n\n`)

            // TODO: notice any following problems and delete this whole nonsense
            // Without this response wasn't sent, Possibly a bug
            // Bug possibly fixed
            // client.res.writeProcessing()
        }
    })
}
let clients: {
    // TODO: Convert to sessionId
    id: string
    res: Response
}[] = []