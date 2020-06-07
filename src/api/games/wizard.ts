import express, { Response } from "express"
import IRoom from "../../engine/lobby/interfaces/Room"
import WizBuilder from "../../wizard_game/WizBuilder"
import WizMaster from "../../wizard_game/WizMaster"
import LobbyMaster from "../../engine/lobby/LobbyMaster"
import LobbyStore from "../../engine/lobby/LobbyStore"
import IPlayer from "../../engine/lobby/interfaces/Player"

const router = express.Router()

// TODO: Move away to another api route and ".use" it
const SSE_RESPONSE_HEADER = {
  'Connection': 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no',
};

// TODO: Move away to another api route and ".use" it
router.get('/updates', async (req, res) => {
    req.socket.setTimeout(0)
    req.socket.setNoDelay(true)
    req.socket.setKeepAlive(true)
    res.writeHead(200, SSE_RESPONSE_HEADER)

    res.write(`data: ${JSON.stringify("OK")}\n\n`)
    // TODO: Refactor it to session ID
    const clientId = req.playerId
    const newClient = {
        id: clientId,
        res
    }
    clients.push(newClient);

    req.on('close', () => {
        // TODO: Possibly log this
        clients = clients.filter(client => client.id !== clientId)
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
        const nextPlayer = (await WizMaster.getGamePlayerIds(gameId))[0]
        res.send({nextPlayer})
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
router.get('/:gameId/handsizes', async (req, res) => {
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
router.get('/:gameId/bets', async (req, res) => {
    const playerId = req.playerId
    if (playerId) {
        const gameId = req.params.gameId
        const bets = await WizMaster.getGameBets(gameId)
        res.send({bets})
    }
    else {
        res.status(403).send("Player not set")
    }
})
router.get('/:gameId/kozer', async (req, res) => {
    const playerId = req.playerId
    if (playerId) {
        const gameId = req.params.gameId
        const strongSuit = await WizMaster.getStrongSuit(gameId)
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
        const isBetPlayed = await WizMaster.playBet(gameId, +bet, playerId)
        if (isBetPlayed) {
            const playerIds = await WizMaster.getGamePlayerIds(gameId)
            sendUpdateState(playerIds)
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
            sendUpdateState(playerIds)
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

function sendUpdateState(playerIds: IPlayer["id"][]) {
    clients.forEach(client => {
        if (playerIds.indexOf(client.id) !== -1) {
            client.res.write(`data: ${JSON.stringify({update: true})}\n\n`)
            // Without this response isn't sent
            client.res.writeProcessing()
        }
    })
}
let clients: {
    // TODO: Convert to sessionId
    id: string
    res: Response
}[] = []
export default router