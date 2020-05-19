import express from "express"
import { generateId } from "../engine/id_generator"
import store from "../engine/key_value_state_store"
import IRoom from "../engine/room_logic/models/Room"
import WizBuilder from "../wiz_logic/WizBuilder"

const router = express.Router()

router.post('/wiz', async ( req, res ) => {
    const playerId = req.playerId
    const roomId = req.body.roomId
    try {
        const room : IRoom = JSON.parse(await store.getAsync()(roomId))
        if (room.leader === playerId) {
            const gameId = generateId(roomId,process.env.UUID_GAME_NAMESPACE)

            const game = WizBuilder.newGameState(gameId, room.id, room.players)

            const storeResponse = await store.setAsync()(gameId, JSON.stringify(game))
            res.send(`Game ${game.id} created`)
        }
        else {
            res.send("You are not room leader")
        }
    }
    catch(error) {
        res.status(500)
        res.send("FAIL")
    }
})

/*router.get('/wiz', (req, res) => {
    const playerId = req.signedCookies.player_id
    const gameId = req.body.gameId
    store.getAsync()(gameId).then((gameJson : string) => {
        const game : IWizGame = JSON.parse(gameJson)
        if (game.players.findIndex(player => player == playerId) != -1) {
            res.send()
        }
        else {
            res.send("You are not in the specified room")
        }
    }).catch((err: any) => {
        res.status(500)
        res.send("FAIL")
    })

})
*/
router.post('/wiz:bet', (req, res) => {
    res.send("Bet submitted")
})

router.post('/wiz:card', ( req, res ) => {
    // set next player
    res.send("Player made his move")
})

export default router