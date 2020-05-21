import express from "express"
import { generateId } from "../engine/id_generator"
import store from "../engine/key_value_state_store"
import Room from "../engine/lobby_logic/logic/Room";
import IRoom from "../engine/lobby_logic/models/Room";
import LobbyBuilder from "../engine/lobby_logic/LobbyBuilder";
const router = express.Router()

router.post('/', async (req, res) => {
    const playerId = req.playerId

    if (playerId) {
        try {
            const roomId = await LobbyBuilder.createRoom(playerId)
            res.send(roomId)
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
            const room : IRoom = JSON.parse(await store.getAsync()(roomId))
            if (room.players.indexOf(playerId) !== -1)
                res.send(room);
        }
        catch (error) {
            res.status(500)
            res.send("FAIL")
        }
    }
})
router.get('/:roomId/join', async ( req, res ) => {
    const playerId = req.playerId
    if (playerId) {
        const roomId = req.params.roomId

        if (roomId) {
            try {
                const room : IRoom = JSON.parse(await store.getAsync()(roomId))
                room.players.push(playerId)
                const storeResponse = await store.setAsync()(room.id, JSON.stringify(room))
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
});

router.delete('/player', ( req, res ) => {
    // req.player
    // req.room
    res.send( "Player left room" );
} );
router.put('/leader', ( req, res ) => {
    // req.player
    // req.room
    // req.newleader
    res.send( "Leader changed" );
} );

router.put('/gametype', ( req, res ) => {
    // req.isPlayerMaster
    res.send( "game changed" );
} );

router.get('/gametype', ( req, res ) => {
    // req.isPlayerinRoom?
    res.send( "Game type is:" );
} );

export default router