import express from "express"
import { generateId } from "../engine/id_generator"
import store from "../engine/key_value_state_store"
import Player from "../engine/lobby_logic/logic/Player"
import IPlayer from "../engine/lobby_logic/models/Player"
import LobbyBuilder from "../engine/lobby_logic/LobbyBuilder"
import LobbyMaster from "../engine/lobby_logic/LobbyMaster"

const router = express.Router()

router.post('/', async (req, res) => {
    if (!req.signedCookies.player_id) {
        const playerName = req.body.playerName

        try {
            const playerId = await LobbyBuilder.createPlayer(playerName)
            
            res.cookie("player_name", playerName, { signed: true })
            res.cookie("player_id", playerId, { signed: true })
            res.send("Player created, cookie sent")
        }
        catch(error) {
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
        try {
            const storeResponse = await LobbyMaster.deletePlayer(playerId)
            res.clearCookie("player_name", { signed: true })
            res.clearCookie("player_id", { signed: true })
            res.send("Player deleted, cookie deleted")
        }
        catch (error) {
            res.status(500)
            res.send("FAIL")
        }
    }
    else {
        res.send("You are not any player (No cookies)")
    }
})

export default router