import express from "express"
import IRoom from "../../engine/lobby/interfaces/Room"
import WizBuilder from "../../wizard_game/WizBuilder"
import WizMaster from "../../wizard_game/WizMaster"
import LobbyMaster from "../../engine/lobby/LobbyMaster"
import LobbyStore from "../../engine/lobby/LobbyStore"
import Announcer from "../../engine/announcer/Announcer"
import WizStore from "../../wizard_game/WizStore"
import { WizAnnouncementType } from "../../wizard_game/enums/WizAnnouncementType"

const router = express.Router()
router.get('/:gameId/updates', (req, res) => {
    const gameId = req.params.gameId
    const playerId = req.playerId

    Announcer.subscribe(req, res, gameId, playerId, async () => {
        // TODO: Refactor
        const game = await WizStore.getWizGame(gameId)
        if (game) {
            return game.announcement
        }
        else {
            return {}
        }
    })
})

router.post('/:roomId', async ( req, res ) => {
    const playerId = req.playerId
    const roomId = req.params.roomId

    const room : IRoom = await LobbyStore.getRoom(roomId)
    if (room) {
        if (room.leader === playerId) {
            const gameId = await WizBuilder.newGameState(room.id, room.players)
            const isRoomSet = await LobbyMaster.setRoomGame(room.id, "wizard", gameId)
            const areCardsDealt  = await WizMaster.dealCards(gameId)

            if (gameId && isRoomSet && areCardsDealt)
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

router.get('/:gameId', async (req, res) => {
    const playerId = req.playerId
    const gameId = req.params.gameId
    if (playerId && WizMaster.isPlayerInGame(playerId, gameId)) {
        const instruction = await WizMaster.getGameInstruction(gameId)
        res.send({instruction})
    }
    else {
        res.status(403).send("Player needs be set")
    }
})
router.get('/:gameId/nextPlayer', async (req, res) => {
    const playerId = req.playerId
    const gameId = req.params.gameId
    if (playerId && WizMaster.isPlayerInGame(playerId, gameId)) {
        const round = await WizMaster.getGameRound(gameId)
        if (round) {
            const nextPlayer = round.playerOrder[0]
            res.send({nextPlayer})
        }
    }
    else {
        res.status(403).send("Player needs be set")
    }
})
router.get('/:gameId/players', async (req,res) => {
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
// router.get('/:gameId/handsizes', async (req, res) => {
//     const playerId = req.playerId
//     if (playerId) {
//         const gameId = req.params.gameId
//         const playerHandSizes = await WizMaster.getPlayerHandSizes(gameId)
//         res.send({playerHandSizes})
//     }
//     else {
//         res.status(403).send("Player needs be set")
//     }
// })
router.get('/:gameId/hand', async (req,res) => {
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
router.get('/:gameId/stack', async (req,res) => {
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
// router.get('/:gameId/bets', async (req, res) => {
//     const playerId = req.playerId
//     if (playerId) {
//         const gameId = req.params.gameId
//         const bets = await WizMaster.getGameBets(gameId)
//         res.send({bets})
//     }
//     else {
//         res.status(403).send("Player not set")
//     }
// })
router.get('/:gameId/kozer', async (req, res) => {
    const playerId = req.playerId
    if (playerId) {
        const gameId = req.params.gameId
        const strongSuit = await WizMaster.getRoundStrongSuit(gameId)
        res.send({strongSuit})
    }
    else {
        res.status(403).send("Player not set")
    }
})

router.post('/:gameId/bet/:bet', async (req, res) => {
    const playerId = req.playerId
    if (playerId) {
        const gameId = req.params.gameId
        const bet = req.params.bet
        const isBetPlayed = await WizMaster.tryPlayBet(gameId, +bet, playerId)
        if (isBetPlayed) {
            const playerIds = await WizMaster.getGamePlayerIds(gameId)

            res.send({isBetPlayed})
        }
        else {
            res.status(500).send()
        }
    }
    else {
        res.status(403).send("Player not set")
    }
})
router.post('/:gameId/play', async ( req, res ) => {
    const playerId = req.playerId
    if (playerId) {
        const gameId = req.params.gameId
        const card = req.body
        const isCardPlayed = await WizMaster.tryPlayCard(gameId, card, playerId)
        if (isCardPlayed){
            const playerIds = await WizMaster.getGamePlayerIds(gameId)

            res.send({isCardPlayed})
        }
        else {
            res.status(500).send()
        }
    }
    else {
        res.status(403).send("Player not set")
    }
})

export default router