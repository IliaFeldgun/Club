import express from "express"
const router = express.Router()

router.post('/', ( req, res ) => {
    // req.username
    // res.addCookie 
    res.send( "Player created, cookie sent" )
})

router.delete('/', (req,res) => {
    //req.username
    //req.removeCookie
    res.send( "Player deleted, cookie deleted")
})

export default router