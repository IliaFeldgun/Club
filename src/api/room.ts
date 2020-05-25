import express from "express"
import IRoom from "../engine/lobby_logic/models/Room";
import LobbyBuilder from "../engine/lobby_logic/LobbyBuilder";
import LobbyMaster from "../engine/lobby_logic/LobbyMaster";
import LobbyStore from "../engine/lobby_logic/LobbyStore";

const router = express.Router()

router.post('/', async (req, res) => {
    const playerId = req.playerId

    if (playerId) {
        const roomId = await LobbyBuilder.createRoom(playerId)
        const isPlayerAdded = await LobbyMaster.addPlayerToRoom(playerId, roomId)
        if(roomId && isPlayerAdded) {
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
            if (room.players.indexOf(playerId) !== -1)
                res.send(room);
        }
        else {
            res.status(500)
            res.send("FAIL")
        }
    }
})
router.get('/:roomId/players', async (req,res) => {
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
router.post('/:roomId/join', async ( req, res ) => {
    const playerId = req.playerId
    const roomId = req.params.roomId

    if (playerId) {

        if (roomId && await LobbyMaster.addPlayerToRoom(playerId, roomId)) {
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
router.post('/:roomId/game/:gameName', async ( req, res ) => {
    // TODO: possibly not a useful route
    const playerId = req.playerId
    const roomId = req.params.roomId
    const gameName = req.params.gameName

    const room : IRoom = await LobbyStore.getRoom(roomId)
    if (room) {
        if (room.leader === playerId) {
            await LobbyMaster.setRoomGameType(roomId, gameName)
            res.send({})
        }
        else {
            res.send("You are not room leader")
        }
    }
    else {
        res.status(500).send("FAIL")
    }
});

router.get('/:roomId/game', async ( req, res ) => {
    // req.isPlayerinRoom?
    res.send( "Game type is:" );
} );
router.put('/leader', ( req, res ) => {
    // req.player
    // req.room
    // req.newleader
    res.send( "Leader changed" );
} );


export default router