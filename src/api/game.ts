import express from "express"
const router = express.Router()

router.post('/wiz', ( req, res ) => {
    res.send("Player made his move")
})

router.get('/wiz', (req,res) => {
    res.send("This is the game's state")
})

export default router