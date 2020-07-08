import dotenv from "dotenv"
dotenv.config()

import app from './api/app'
const port = process.env.PORT || 8080; // default port to listen

// start the Express server
const server = app.listen( port, () => {
    // console.log( `server started at http://localhost:${ port }` );
});
export default server