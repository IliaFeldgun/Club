import express from "express"
import { generateId } from "../engine/id_generator"
import store from "../engine/key_value_state_store"

const router = express.Router()

router.post('/', (req, res) => {
    if (!req.signedCookies["user_id"])
    {
        const userName = req.body.username
        const id = generateId(userName,process.env.UUID_PLAYER_NAMESPACE)
        
        store.set()(id,userName)
        res.cookie("user_name", userName, { signed: true })
        res.cookie("user_id", id, { signed: true })

        res.send("Player created, cookie sent")
    }
})

router.delete('/', (req,res) => {
    const id = req.signedCookies["user_id"]
    
    if (id)
    {
        store.delete()(id)
        res.clearCookie("user_name", { signed: true })
        res.clearCookie("user_id", { signed: true })
        res.send("Player deleted, cookie deleted")
    }
})

export default router