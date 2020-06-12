import express, { Response } from "express"
import IRoom from "../engine/lobby/interfaces/Room";
import LobbyBuilder from "../engine/lobby/LobbyBuilder";
import LobbyMaster from "../engine/lobby/LobbyMaster";
import LobbyStore from "../engine/lobby/LobbyStore";
import IPlayer from "@engine/lobby/interfaces/Player";

const router = express.Router()
// TODO: Move away to another api route and ".use" it
const SSE_RESPONSE_HEADER = {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'X-Accel-Buffering': 'no',
  };

// TODO: Move away to another api route and ".use" it
router.get('/updates', async (req, res) => {
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
    clients.push(newClient);

    req.on('close', () => {
        // TODO: Possibly log this
        clients = clients.filter(client => client.id !== clientId)
    })
})

router.post('/', async (req, res) => {
    const playerId = req.playerId

    if (playerId) {
        const roomId = await LobbyBuilder.createRoom(playerId)
        const isPlayerinRoom = await LobbyMaster.addPlayerToRoom(playerId, roomId)
        if(roomId && isPlayerinRoom) {
            res.send({roomId})
        }
        else {
            res.status(500)
            res.send("FAIL")
        }
    }
    else {
        res.status(403)
        res.send("Room can't be created, you need to set a player")
    }
});

router.get('/:roomId', async (req, res) => {
    const roomId = req.params.roomId
    const playerId = req.playerId

    if (playerId) {
        const room: IRoom = await LobbyStore.getRoom(roomId)
        if (room) {
            res.send({room});
        }
        else {
            res.status(500)
            res.send("FAIL")
        }
    }
})
router.get('/:roomId/playernames', async (req,res) => {
    const roomId = req.params.roomId
    const playerId = req.playerId

    if (playerId) {
        const players = await LobbyMaster.getRoomPlayers(roomId)
        if (players) {
            res.send({playerNames: players.map((player) => player.name)})
        }
        else {
            res.status(500)
            res.send("FAIL")
        }
    }
})
// router.get('/:roomId/leader', async (req,res) => {
//     const roomId = req.params.roomId
//     const playerId = req.playerId

//     if (playerId) {
//         const leader = await LobbyMaster.getRoomLeader(roomId)
//         if (leader) {
//             res.send({leader})
//         }
//         else {
//             res.status(500)
//             res.send("FAIL")
//         }
//     }
// })
router.post('/:roomId/join', async ( req, res ) => {
    const playerId = req.playerId
    const roomId = req.params.roomId

    if (playerId) {

        if (roomId && await LobbyMaster.addPlayerToRoom(playerId, roomId)) {
            const playerIds = await LobbyMaster.getRoomPlayerIds(roomId)
            sendUpdateState(playerIds)

            res.send({roomId})
        }
        else {
            res.status(500).send("FAIL")
        }
    }
    else {
        res.status(403)
        res.send("Room can't be joined, you need to set a player")
    }
});

router.delete('/:roomId/player', async ( req, res ) => {
    const playerId = req.playerId

    if (playerId) {
        const roomId = req.params.roomId

        if (roomId && await LobbyMaster.removePlayerFromRoom(playerId, roomId)) {
            const playerIds = await LobbyMaster.getRoomPlayerIds(roomId)
            sendUpdateState(playerIds)
            res.send("OK")
        }
        else {
            res.status(500).send("FAIL")
        }
    }
    else {
        res.status(403)
        res.send("Room can't be joined, you need to set a player")
    }
} );
// router.post('/:roomId/game/:gameName', async ( req, res ) => {
//     // TODO: possibly not a useful route
//     const playerId = req.playerId
//     const roomId = req.params.roomId
//     const gameName = req.params.gameName

//     const room : IRoom = await LobbyStore.getRoom(roomId)
//     if (room) {
//         if (room.leader === playerId) {
//             await LobbyMaster.setRoomGameType(roomId, gameName)
//             const playerIds = room.players
//             sendUpdateState(playerIds)
//             res.send({})
//         }
//         else {
//             res.send("You are not room leader")
//         }
//     }
//     else {
//         res.status(500).send("FAIL")
//     }
// });

// router.get('/:roomId/game', async ( req, res ) => {
//     const playerId = req.playerId
//     if (playerId) {
//         const roomId = req.params.roomId

//         const game = await LobbyMaster.getRoomGame(roomId)
//         if (game) {
//             res.send({game})
//         }
//     }
//     else {
//         res.status(403).send("FAIL")
//     }
// } );
router.put('/leader', ( req, res ) => {
    // req.player
    // req.room
    // req.newleader
    res.send( "Leader changed" );
} );

function sendUpdateState(playerIds: IPlayer["id"][]) {
    clients.forEach(client => {
        if (playerIds.indexOf(client.id) !== -1) {
            client.res.write(`data: ${JSON.stringify({update: true})}\n\n`)
            // Without this response isn't sent
            client.res.writeProcessing()
        }
    })
}
let clients: {
    // TODO: Convert to sessionId
    id: string
    res: Response
}[] = []

export default router