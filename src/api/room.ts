import express from "express"
const router = express.Router()

router.post('/', (req, res) => {
    // req.gametype
    // req.player
    res.send( "Room " +req.body.roomName+ " created" );
} );

router.post('/player', ( req, res ) => {
    // req.player
    // req.room
    res.send( "Player joined room" );
} );

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