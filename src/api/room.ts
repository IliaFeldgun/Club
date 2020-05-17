import express from "express"
import { generateId } from "../engine/id_generator"
import store from "../engine/key_value_state_store"
import Room from "../engine/room_logic/logic/Room";
import IRoom from "../engine/room_logic/models/Room";
const router = express.Router()

router.post('/', (req, res) => {
    const playerId = req.signedCookies.player_id

    if (playerId) {
        const roomId = generateId(playerId, process.env.UUID_ROOM_NAMESPACE)
        // TODO: decouple
        const room : IRoom = new Room(roomId, playerId)
        room.addPlayer(playerId)
        store.setAsync()(room.id, JSON.stringify(room)).then((ok: any) => {
            res.send({roomId: room.id});
        }).catch((err: any) => {
            res.status(500)
            res.send("FAIL")
        })
    }
    else {
        res.status(403)
        res.send("Room can't be created, you need to set a player")
    }
});

router.get('/:roomId', (req, res) => {
    const roomId = req.params.roomId
    const playerId = req.signedCookies.player_id

    if (playerId) {
        store.get()(roomId, (err, reply) => {
            const room : IRoom = JSON.parse(reply)
            if (room.players.filter((player: IPlayer["id"]) => player === playerId).length)
                res.send(room);
        })
    }
})
router.get('/:roomId/join', ( req, res ) => {
    const playerId = req.signedCookies.player_id
    if (playerId) {
        const roomId = req.params.roomId

        if (roomId) {
            store.get()(roomId, (err, reply) => {
                const room : IRoom = JSON.parse(reply)
                room.players.push(playerId)
                store.set()(room.id, JSON.stringify(room))
            })
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