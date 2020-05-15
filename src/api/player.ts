import express from "express"
import { generateId } from "../engine/id_generator"
import store from "../engine/key_value_state_store"
import Player from "../engine/room_logic/logic/Player"

const router = express.Router()

router.post('/', (req, res) => {
    if (!req.signedCookies.player_id) {
        const playerName = req.body.playerName
        const id = generateId(playerName,process.env.UUID_PLAYER_NAMESPACE)
        // TODO: decouple
        const player : IPlayer = new Player(id, playerName)

        store.setAsync()(player.id, JSON.stringify(player)).then((ok: any) => {
                res.cookie("player_name", player.name, { signed: true })
                res.cookie("player_id", player.id, { signed: true })
                res.send("Player created, cookie sent") }
            ).catch((err: any) => {
                res.status(500)
                res.send("FAIL")
            })
    }
    else {
        res.send("You are already " + req.signedCookies.player_name)
    }
})

router.delete('/', (req,res) => {
    const id = req.signedCookies.player_id

    if (id) {
        store.delete()(id)
        res.clearCookie("player_name", { signed: true })
        res.clearCookie("player_id", { signed: true })
        res.send("Player deleted, cookie deleted")
    }
    else {
        res.send("You are not any player (No cookies)")
    }
})

export default router