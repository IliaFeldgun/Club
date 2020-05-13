import dotenv from "dotenv"
dotenv.config()

import path from 'path'
import express from "express"
import cookieParser from "cookie-parser"
import game from "./api/game"
import player from "./api/player"
import room from "./api/room"
import {logger} from "./winston"

const app = express();
const port = process.env.PORT; // default port to listen

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(express.static('./client/build'))

app.use("/api/game", game)
app.use("/api/player", player)
app.use("/api/room", room)

// define a route handler for the default home page
/*app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );
*/
app.get( "/api", (req,res) => {
    res.send( "This is the API")
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile('index.html', {root: "./client/build"});
});

// start the Express server
app.listen( port, () => {
    // console.log( `server started at http://localhost:${ port }` );
} );