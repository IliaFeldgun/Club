import express from "express"
import store from "../engine/key_value_state_store"
import IRoom from "../engine/lobby_logic/models/Room"
import WizBuilder from "../wiz_logic/WizBuilder"
import WizMaster from "../wiz_logic/WizMaster"
import LobbyMaster from "../engine/lobby_logic/LobbyMaster"

const router = express.Router()

router.post('/wiz', async ( req, res ) => {
    const playerId = req.playerId
    const roomId = req.body.roomId
    try {
        const room : IRoom = await LobbyMaster.getRoom(roomId)

        if (room.leader === playerId) {
            const game = WizBuilder.newGameState(room.id, room.players)
            const round = WizBuilder.newRoundState(game.id,
                                                   1,
                                                   room.players,
                                                   room.players[0])

            WizMaster.dealCards(round)

            const storeResponse = await store.setAsync()(game.id, JSON.stringify(game))
            res.send({gameId: game.id})
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
router.post('/wiz/bet/:bet', (req, res) => {
    res.send("Bet submitted")
})

router.post('/wiz/play/:card', ( req, res ) => {
    // set next player
    res.send("Player made his move")
})

export default router