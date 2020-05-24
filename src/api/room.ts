import express from "express"
import IRoom from "../engine/lobby_logic/models/Room";
import LobbyBuilder from "../engine/lobby_logic/LobbyBuilder";
import LobbyMaster from "../engine/lobby_logic/LobbyMaster";
import { REPL_MODE_SLOPPY } from "repl";

const router = express.Router()

router.post('/', async (req, res) => {
    const playerId = req.playerId

    if (playerId) {
        try {
            const roomId = await LobbyBuilder.createRoom(playerId)
            res.send({ roomId})
        }
        catch (error) {
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
        try {
            const room: IRoom = await LobbyMaster.getRoom(roomId)
            if (room.players.indexOf(playerId) !== -1)
                res.send(room);
        }
        catch (error) {
            res.status(500)
            res.send("FAIL")
        }
    }
})
router.get('/:roomId/players', async (req,res) => {
    const roomId = req.params.roomId
    const playerId = req.playerId

    if (playerId) {
        try {
            const players = await LobbyMaster.getRoomPlayerNames(roomId)
            res.send({playerNames: players})
        }
        catch (error) {
            res.status(500)
            res.send("FAIL")
        }
    }
})
router.post('/:roomId/join', async ( req, res ) => {
    const playerId = req.playerId

    if (playerId) {
        const roomId = req.params.roomId

        if (roomId) {
            try {
                const storeResponse = await LobbyMaster.addPlayerToRoom(playerId, roomId)

                res.send({roomId})
            }
            catch (error) {
                res.status(500).send("FAIL")
            }
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

        if (roomId) {
            try {
                const storeResponse = await LobbyMaster.removePlayerFromRoom(playerId, roomId)

                res.send("OK")
            }
            catch (error) {
                res.status(500).send("FAIL")
            }
        }
    }
    else {
        res.status(403)
        res.send("Room can't be joined, you need to set a player")
    }
} );
router.post('/:roomId/game/:gameName', async ( req, res ) => {
    const playerId = req.playerId
    const roomId = req.params.roomId
    const gameName = req.params.gameName
    
    try {
        const room : IRoom = await LobbyMaster.getRoom(roomId)
        
        if (room.leader === playerId) {
            await LobbyMaster.setRoomGame(roomId, gameName)
            res.send({})
        }
        else {
            res.send("You are not room leader")
        }
    }
    catch (error) {
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