import express from "express"
import IRoom from "../engine/lobby/interfaces/Room";
import LobbyBuilder from "../engine/lobby/LobbyBuilder";
import LobbyMaster from "../engine/lobby/LobbyMaster";
import LobbyStore from "../engine/lobby/LobbyStore";
import SSE from "../engine/request_handlers/server_sent_events"
import Validator from 'validator'
import { HttpError } from "../engine/request_handlers/error_handler";

const router = express.Router()
router.get('/updates', SSE.subscribeClient)

router.post('/', async (req, res, next) => {
    const playerId = req.playerId

    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }

    const roomId = await LobbyBuilder.createRoom(playerId)
    const isPlayerinRoom = await LobbyMaster.addPlayerToRoom(playerId, roomId)

    if(roomId && isPlayerinRoom) {
        res.status(200).send({roomId})
    }
    else {
        return next(new HttpError(500, "Failed to create room"))
    }
});

router.get('/:roomId', async (req, res, next) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const roomId = req.params.roomId
    if (!Validator.isUUID(roomId)) {
        return next(new HttpError(400, "Room ID invalid"))
    }
    const room: IRoom = await LobbyStore.getRoom(roomId)
    if (room) {
        res.status(200).send({room});
    }
    else {
        return next(new HttpError(500, "Failed to retrieve room"))
    }
})
router.get('/:roomId/playernames', async (req,res, next) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const roomId = req.params.roomId
    if (!Validator.isUUID(roomId)) {
        return next(new HttpError(400, "Room ID invalid"))
    }
    const players = await LobbyMaster.getRoomPlayers(roomId)
    if (players) {
        res.status(200).send({playerNames: players.map((player) => player.name)})
    }
    else {
        return next(new HttpError(500, "Failed to get room player names"))
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
router.post('/:roomId/join', async ( req, res, next ) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const roomId = req.params.roomId
    if (!Validator.isUUID(roomId)) {
        return next(new HttpError(400, "Room ID invalid"))
    }
    if (roomId && await LobbyMaster.addPlayerToRoom(playerId, roomId)) {
        const playerIds = await LobbyMaster.getRoomPlayerIds(roomId)
        SSE.sendUpdateToClient(playerIds)

        res.status(200).send({roomId})
    }
    else {
        return next(new HttpError(500, "Failed to join room"))
    }
});

router.delete('/:roomId/player', async ( req, res, next ) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const roomId = req.params.roomId
    if (!Validator.isUUID(roomId)) {
        return next(new HttpError(400, "Room ID invalid"))
    }
    if (await LobbyMaster.removePlayerFromRoom(playerId, roomId)) {
        const playerIds = await LobbyMaster.getRoomPlayerIds(roomId)
        SSE.sendUpdateToClient(playerIds)
        res.status(200).send("OK")
    }
    else {
        return next(new HttpError(500, "Failed to remove player"))
    }
});
router.put('/leader', ( req, res ) => {
    // req.player
    // req.room
    // req.newleader
    res.send( "Leader changed" );
} );

export default router