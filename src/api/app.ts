import express from "express"
import cors from 'cors'
import wizard from "../wizard_game/api/wizard"
import player from "./player"
import room from "./room"
import httpLogger from "morgan"
import session from '../engine/request_handlers/session'
import assertPlayer from "../engine/request_handlers/player_assert"
import * as errorHandler from "../engine/request_handlers/error_handler"
const app = express();

app.enable('trust proxy')
app.use(cors({origin: process.env.CLIENT_ORIGIN, credentials: true}))
app.use(httpLogger('dev'))
app.use(express.json());
app.use(session)
app.use(assertPlayer)

app.use("/api/game/wizard", wizard)
app.use("/api/player", player)
app.use("/api/room", room)

app.get("/api", (req,res) => {
    res.send( "This is the API")
})

app.use(errorHandler.handleError)
app.use(errorHandler.logError)
app.use(errorHandler.handleClientError)

export default app