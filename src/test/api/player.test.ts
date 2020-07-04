import request from 'supertest'
import app from '../../api/app'
import Validator from 'validator'

describe("Testing player login", () => {
    const apiRoute = "/api/player"
    test('Player creation', async () => {
        const playerName = "testplayer123"
        const res = await request(app)
            .post(apiRoute)
            .send({playerName})
        expect(res.status).toBe(200)
        const cookie = res.get("Set-Cookie")
        expect(cookie.length).toBe(1)
        expect(Validator.isUUID(res.body.playerId)).toBe(true)
    })
    test('Player creation with invalid characters', async () => {
        const playerName = "$badName;--injectwhatever"
        const res = await request(app)
            .post(apiRoute)
            .send({playerName})
            expect(res.status).toBe(400)
    })
    test('Player creation with no name', async () => {
        const playerName = ""
        const res = await request(app)
            .post(apiRoute)
            .send({playerName})
        expect(res.status).toBe(400)
    })
    test('Player creation with cookie', async () => {
        const playerName = "testplayer123"
        const res = await request(app)
            .post(apiRoute)
            .send({playerName})
        const playerName2 = "diffplayer321"
        const cookie = res.get("Set-Cookie")
        const res2 = await request(app)
            .post(apiRoute)
            .set("Cookie", cookie)
            .send({playerName: playerName2})
        expect(res2.status).toBe(403)
    })
})