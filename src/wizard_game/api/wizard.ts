import express from "express"
import IRoom from "../../engine/lobby/interfaces/Room"
import WizBuilder from "../../wizard_game/WizBuilder"
import WizMaster from "../../wizard_game/WizMaster"
import LobbyMaster from "../../engine/lobby/LobbyMaster"
import LobbyStore from "../../engine/lobby/LobbyStore"
import Announcer from "../../engine/announcer/Announcer"
import WizStore from "../../wizard_game/WizStore"
import Validator from 'validator'
import { HttpError } from "../../engine/request_handlers/error_handler";
import { isNumber, isBoolean } from "util"
import Card from "../../card_engine/models/Card"

const router = express.Router()
router.get('/:gameId/updates', (req, res, next) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const gameId = req.params.gameId
    if (!Validator.isUUID(gameId)) {
        return next(new HttpError(400, "Room ID invalid"))
    }
    const announcementPayloader = async () => {
        const game = await WizStore.getWizGame(gameId)
        if (game) {
            return game.announcement
        }
        else {
            return {}
        }

    }
    Announcer.subscribe(req, res, gameId, announcementPayloader)

})

router.post('/:roomId', async (req, res, next) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const roomId = req.params.roomId
    if (!Validator.isUUID(roomId)) {
        return next(new HttpError(400, "Room ID invalid"))
    }

    const room: IRoom = await LobbyStore.getRoom(roomId)
    if (!room) {
        return next(new HttpError(500, "Failed to get room"))
    }
    if (room.leader !== playerId) {
        return next(new HttpError(403, "Not room leader"))
    }

    const gameId = await WizBuilder.newGameState(room.id, room.players)
    const isRoomSet = await LobbyMaster.setRoomGame(room.id, "wizard", gameId)
    const areCardsDealt = await WizMaster.dealCards(gameId)

    if (gameId && isRoomSet && areCardsDealt) {
        res.status(200).send({ gameId })
    }
    else {
        return next(new HttpError(500, "Failed to initialize game"))
    }
})

router.get('/:gameId', async (req, res, next) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const gameId = req.params.gameId
    if (!Validator.isUUID(gameId)) {
        return next(new HttpError(400, "Game ID invalid"))
    }
    if (!WizMaster.isPlayerInGame(playerId, gameId)) {
        return next(new HttpError(403, "Player isn't in game"))
    }
    const instruction = await WizMaster.getGameInstruction(gameId)
    if (instruction) {
        res.status(200).send({ instruction })
    }
    else {
        return next(new HttpError(500, "Failed to retrieve instructions"))
    }
})
router.get('/:gameId/nextPlayer', async (req, res, next) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const gameId = req.params.gameId
    if (!Validator.isUUID(gameId)) {
        return next(new HttpError(400, "Game ID invalid"))
    }
    const round = await WizMaster.getGameRound(gameId)
    if (round) {
        const nextPlayer = round.playerOrder[0]
        res.status(200).send({ nextPlayer })
    }
    else {
        return next(new HttpError(500, "Failed to retrieve next player"))
    }
})
router.get('/:gameId/players', async (req, res, next) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const gameId = req.params.gameId
    if (!Validator.isUUID(gameId)) {
        return next(new HttpError(400, "Game ID invalid"))
    }
    const players = await WizMaster.getWizPlayersByGame(gameId)
    if (players) {
        res.status(200).send({ players })
    }
    else {
        return next(new HttpError(500, "Failed to retrieve players"))
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
router.get('/:gameId/hand', async (req, res, next) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const gameId = req.params.gameId
    if (!Validator.isUUID(gameId)) {
        return next(new HttpError(400, "Game ID invalid"))
    }
    const playerHand = await WizMaster.getPlayerHand(gameId, playerId)
    if (playerHand) {
        res.status(200).send({ playerHand })
    }
    else {
        return next(new HttpError(500, "Failed to retrieve player hand"))
    }

})
router.get('/:gameId/stack', async (req, res, next) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const gameId = req.params.gameId
    if (!Validator.isUUID(gameId)) {
        return next(new HttpError(400, "Game ID invalid"))
    }
    const stack = await WizMaster.getTableStack(gameId)
    if (stack) {
        res.status(200).send({ stack })
    }
    else {
        return next(new HttpError(500, "Failed to retrieve table stack"))
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
router.get('/:gameId/kozer', async (req, res, next) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const gameId = req.params.gameId
    if (!Validator.isUUID(gameId)) {
        return next(new HttpError(400, "Game ID invalid"))
    }
    const strongSuit = await WizMaster.getRoundStrongSuit(gameId)
    if (strongSuit) {

        res.status(200).send({ strongSuit })
    }
    else {
        return next(new HttpError(500, "Failed to retrieve strong suit"))
    }
})

router.post('/:gameId/bet/:bet', async (req, res, next) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const gameId = req.params.gameId
    if (!Validator.isUUID(gameId)) {
        return next(new HttpError(400, "Game ID invalid"))
    }
    const bet = +req.params.bet
    if (!isNumber(bet)) {
        return next(new HttpError(400, "Invalid bet requested"))
    }
    const isBetPlayed = await WizMaster.tryPlayBet(gameId, bet, playerId)
    if (isBoolean(isBetPlayed)) {
        res.status(200).send({ isBetPlayed })
    }
    else {
        return next(new HttpError(500, "Failed to play bet"))
    }
})
router.post('/:gameId/play', async (req, res, next) => {
    const playerId = req.playerId
    if (!playerId) {
        return next(new HttpError(401, "No player detected"))
    }
    const gameId = req.params.gameId
    if (!Validator.isUUID(gameId)) {
        return next(new HttpError(400, "Game ID invalid"))
    }
    const card = req.body
    if (!Card.isCard(card)) {
        return next(new HttpError(400, "Invalid card requested"))
    }

    const isCardPlayed = await WizMaster.tryPlayCard(gameId, card, playerId)

    if (isBoolean(isCardPlayed)) {
        res.status(200).send({ isCardPlayed })
    }
    else {
        return next(new HttpError(500, "Failed to play card"))
    }
})

export default router