import request from 'supertest'
import server from '../../index'
import Validator from 'validator'

describe("Testing player routes", () => {
    const apiRoute = "/api/player"
    test('Player creation', async () => {
        const playerName = "testplayer123"
        const res = await request(server)
            .post(apiRoute)
            .send({playerName})
        expect(res.status).toBe(200)
        expect(Validator.isUUID(res.body.playerId)).toBe(true)
    })
    test('Player creation with invalid characters', async () => {
        const playerName = "$badName;--injectwhatever"
        const res = await request(server)
            .post(apiRoute)
            .send({playerName})
            expect(res.status).toBe(400)
    })
    test('Player creation with no name', async () => {
        const playerName = ""
        const res = await request(server)
            .post(apiRoute)
            .send({playerName})
        expect(res.status).toBe(400)
    })
    test('Player creation with cookie', async () => {
        const playerName = "testplayer123"
        const res = await request(server)
            .post(apiRoute)
            .send({playerName})
        const playerName2 = "diffplayer321"
        const cookie = res.get("Set-Cookie")
        console.log(cookie)
        const res2 = await request(server)
            .post(apiRoute)
            .set("Cookie", cookie)
            .send({playerName: playerName2})
        expect(res2.status).toBe(403)
    })
})