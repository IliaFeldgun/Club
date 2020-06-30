import request from 'supertest'
import app from '../../api/app'
import Validator from 'validator'

describe("Testing room creation", () => {
    const playerApiRoute = "/api/player"
    const playerName = 'testplayer123'
    let cookie: string[]
    const apiRoute = '/api/room'

    beforeAll(async () => {
        const playerRes = await request(app)
        .post(playerApiRoute)
        .send({playerName})
        cookie = playerRes.get("Set-Cookie")
    })
    
    test('Room creation', async () => {
        const res = await request(app)
            .post(apiRoute)
            .set("Cookie", cookie)
            .send()
        expect(res.status).toBe(200)
        expect(Validator.isUUID(res.body.roomId)).toBe(true)
    })
    test('Room creation no cookie', async () => {
        const res = await request(app)
            .post(apiRoute)
            .send()
        expect(res.status).toBe(401)
    })
})