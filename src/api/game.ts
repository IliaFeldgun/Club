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

const router = express.Router()

router.post('/wiz', ( req, res ) => {
    const playerId = req.signedCookies.player_id
    const roomId = req.body.roomId

    store.getAsync()(roomId).then((roomJson : string) => {
        const room : IRoom = JSON.parse(roomJson)
        if (room.leader === playerId) {

            const gameId = generateId(roomId,process.env.UUID_GAME_NAMESPACE)
            // TODO: Decouple
            // Game intial state creation
            const gameDeck = new Deck(true)
            const gameStack = new Stack([])
            const game = new WizGame(gameId, room.id, gameDeck, gameStack)
            room.players.forEach((player) => {
                game.playerHands[player] = new Stack([])
                game.playerScores[player] = new WizScore()
                game.playerRoundResults[player] = new WizPlayerRoundResult(1)
            })

            store.setAsync()(gameId, JSON.stringify(game)).then((ok:any) => {
                res.send(`Game ${game.id} created`)
            }).catch((err: any) => {
                res.status(500)
                res.send("FAIL")
            })
        }
        else {
            res.send("You are not room leader")
        }
    }).catch((err: any) => {
        res.status(500)
        res.send("FAIL")
    })
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
    res.send("Player made his move")
})

router.get('/wiz', (req,res) => {
    res.send("This is the game's state")
})

export default router