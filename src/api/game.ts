import express from "express"
import IRoom from "../engine/lobby/interfaces/Room"
import WizBuilder from "../wizard_game/WizBuilder"
import WizMaster from "../wizard_game/WizMaster"
import LobbyMaster from "../engine/lobby/LobbyMaster"
import LobbyStore from "../engine/lobby/LobbyStore"
import WizStore from "../wizard_game/WizStore"

const router = express.Router()

router.post('/wiz/:roomId', async ( req, res ) => {
    const playerId = req.playerId
    const roomId = req.params.roomId

    const room : IRoom = await LobbyStore.getRoom(roomId)
    if (room) {
        if (room.leader === playerId) {
            const gameId = await WizBuilder.newGameState(room.id, room.players)
            const isRoomSet = await LobbyMaster.setRoomGame(room.id, "wiz", gameId)
            const roundId = await WizBuilder.newRoundState(gameId,
                                                           1,
                                                           room.players,
                                                           room.players[0])
            const isGameSet = await WizMaster.setGameRound(gameId, roundId)
            const areCardsDealt  = await WizMaster.dealCards(roundId)

            if (gameId && isRoomSet && roundId && isGameSet && areCardsDealt)
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
router.get('/wiz/:gameId/handsizes', async (req, res) => {
    const playerId = req.playerId
    if (playerId) {
        const gameId = req.params.gameId
        const playerHandSizes = await WizMaster.getPlayerHandSizes(gameId)
        res.send({playerHandSizes})
    }
    else {
        res.status(403).send("Player needs be set")
    }
})
router.get('/wiz/:gameId/hand', async (req,res) => {
    const playerId = req.playerId
    if (playerId) {
        const gameId = req.params.gameId
        const playerHand = await WizMaster.getPlayerHand(gameId, playerId)
        res.send({playerHand})
    }
    else {
        res.status(403).send("Player needs to be set")
    }
})
router.get('/wiz/:gameId/stack', async (req,res) => {
    const playerId = req.playerId
    if (playerId) {
        const gameId = req.params.gameId
        const stack = await WizMaster.getTableStack(gameId)
        res.send({stack})
    }
    else {
        res.status(403).send("Player not set")
    }
})

router.post('/wiz/bet/:bet', (req, res) => {
    res.send("Bet submitted")
})

router.post('/wiz/:gameId/play', async ( req, res ) => {
    const playerId = req.playerId
    if (playerId) {
        const gameId = req.params.gameId
        const card = req.body.card
        const isCardPlayed = await WizMaster.playCard(gameId, card, playerId)
        if (isCardPlayed)
            res.send()
        else {
            res.status(500).send()
        }
    }
    res.send("Player made his move")
})

export default router