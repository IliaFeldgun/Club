import express from "express"
// import cookieParser from "cookie-parser"
import cors from 'cors'
import wizard from "../wizard_game/api/wizard"
import player from "./player"
import room from "./room"
import httpLogger from "morgan"
import session from '../engine/request_handlers/session'
import assertPlayer from "../engine/request_handlers/player_assert"
import * as errorHandler from "../engine/request_handlers/error_handler"
const app = express();

app.use(cors({origin: process.env.CLIENT_ORIGIN, credentials: true}))
app.use(httpLogger('dev'))
app.use(express.json());
// app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session)
// app.use(express.urlencoded({extended: true}))
app.use(assertPlayer)

app.use(express.static('./client/build'))

app.use("/api/game/wizard", wizard)
app.use("/api/player", player)
app.use("/api/room", room)

// define a route handler for the default home page
/*app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );
*/
app.get("/api", (req,res) => {
    res.send( "This is the API")
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile('index.html', {root: "./client/build"});
});

app.use(errorHandler.handleError)
app.use(errorHandler.logError)
app.use(errorHandler.handleClientError)

export default app