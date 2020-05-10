import dotenv from "dotenv"
dotenv.config()

import express from "express"
import game from "./api/game"
import player from "./api/player"
import room from "./api/room"
import winston from "winston"

const logger = winston.createLogger( {
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service'},
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error'}),
        new winston.transports.File({ filename: 'combined.log' })
    ]
})

logger.log('info', 'This is the first log');
const app = express();
const port = process.env.PORT; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.get( "/api", (req,res) => {
    res.send( "This is the API")
})

app.use("/api/game", game)
app.use("/api/player", player)
app.use("/api/room", room)

// start the Express server
app.listen( port, () => {
    // console.log( `server started at http://localhost:${ port }` );
} );