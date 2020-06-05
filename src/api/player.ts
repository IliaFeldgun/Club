import express from "express"
import LobbyBuilder from "../engine/lobby/LobbyBuilder"
import LobbyStore from "../engine/lobby/LobbyStore"
import LobbyMaster from "../engine/lobby/LobbyMaster"

const router = express.Router()

router.post('/', async (req, res) => {
    if (!req.signedCookies.player_id) {
        const playerName = req.body.playerName
        const playerId = await LobbyBuilder.createPlayer(playerName)
        if (playerId) {
            res.cookie("player_name", playerName, { signed: true })
            res.cookie("player_id", playerId, { signed: true })
            res.send("Player created, cookie sent")
        }
        else {
            res.status(500)
            res.send("FAIL")
        }
    }
    else {
        res.send("You are already " + req.signedCookies.player_name)
    }
})

router.delete('/', async (req, res) => {
    const playerId = req.playerId

    if (playerId) {
        if (await LobbyStore.deletePlayer(playerId)) {
            res.clearCookie("player_name", { signed: true })
            res.clearCookie("player_id", { signed: true })
            res.send("Player deleted, cookie deleted")
        }
        else {
            res.status(500)
            res.send("FAIL")
        }
    }
    else {
        res.send("You are not any player (No cookies)")
    }
})

router.get('/rooms', async (req, res) => {
    const playerId = req.playerId

    if (playerId) {
        const rooms = await LobbyMaster.getPlayerRoomIds(playerId)
        if (rooms) {
            res.send({rooms})
        }
        else {
            res.status(500)
            res.send("FAIL")
        }
    }
})

export default router