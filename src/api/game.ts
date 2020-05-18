import express from "express"
import { generateId } from "../engine/id_generator"
import store from "../engine/key_value_state_store"
import Deck from "../card_logic/logic/Deck"
import Stack from "../card_logic/logic/Stack"
import { WizScore } from "../wiz_logic/logic/WizScore"
import WizGame from "../wiz_logic/logic/WizGame"
import WizPlayerRoundResult from "../wiz_logic/logic/WizPlayerRoundResult"
import IRoom from "../engine/room_logic/models/Room"
import IWizGame from "../wiz_logic/models/WizGame"
import WizMaster from "../wiz_logic/WizMaster"

const router = express.Router()

router.post('/wiz', async ( req, res ) => {
    const playerId = req.playerId
    const roomId = req.body.roomId
    try {
        const room : IRoom = JSON.parse(await store.getAsync()(roomId))
        if (room.leader === playerId) {
            const gameId = generateId(roomId,process.env.UUID_GAME_NAMESPACE)

            const game = WizMaster.newGameState(gameId, room.id, room.players)

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