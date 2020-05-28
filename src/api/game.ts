import express from "express"
import IRoom from "../engine/lobby/models/Room"
import WizBuilder from "../wiz_logic/WizBuilder"
import WizMaster from "../wiz_logic/WizMaster"
import LobbyMaster from "../engine/lobby/LobbyMaster"
import LobbyStore from "../engine/lobby/LobbyStore"
import WizStore from "../wiz_logic/WizStore"

const router = express.Router()

router.post('/wiz/:roomId', async ( req, res ) => {
    const playerId = req.playerId
    const roomId = req.params.roomId

    const room : IRoom = await LobbyStore.getRoom(roomId)
    if (room) {
        if (room.leader === playerId) {
            const gameId = await WizBuilder.newGameState(room.id, room.players)
            const isRoomSet = await LobbyMaster.setRoomGameType(room.id, "wiz")
            const roundId = await WizBuilder.newRoundState(gameId,
                                                           1,
                                                           room.players,
                                                           room.players[0])
            if (gameId && isRoomSet && roundId && WizMaster.dealCards(roundId))
            {
                res.send({gameId})
            }
            else {
                res.status(500)
                res.send("FAIL")
            }
        }
        else {
            res.status(403)
            res.send("You are not room leader")
        }
    }
    else {
        res.status(500)
        res.send("FAIL")
    }
})
router.get('/wiz/:gameId', async (req, res) => {
    const playerId = req.playerId
    const gameId = req.params.gameId
    if (playerId && WizMaster.isPlayerInGame(playerId, gameId)) {
        const game = await WizStore.getWizGame(gameId)
        res.send({game})
    }
    else {
        res.status(403).send("Player needs be set")
    }
})
router.get('/wiz/:gameId/players', async (req,res) => {
    const playerId = req.playerId
    if (playerId) {
        const gameId = req.params.gameId
        const players = await WizMaster.getWizPlayersByGame(gameId)
        res.send({players})
    }
    else {
        res.status(403).send("Player needs be set")
    }
})
router.get('/wiz/:gameId/round', async (req, res) => {
    const playerId = req.playerId
    if (playerId) {
        const gameId = req.params.gameId
        const round = await WizMaster.getWizRoundByGame(gameId)
        res.send({round})
    }
    else {
        res.status(403).send("Player needs be set")
    }
})

router.post('/wiz/bet/:bet', (req, res) => {
    res.send("Bet submitted")
})

router.post('/wiz/play/:card', ( req, res ) => {
    // set next player
    res.send("Player made his move")
})

export default router