import request from 'supertest'
import app from '../../api/app'

describe("Testing player retrieval", () => {
    const playerApiRoute = "/api/player"
    const playerName = 'testplayer123'
    let cookie: string[]

    beforeAll(async () => {
        const playerRes = await request(app)
        .post(playerApiRoute)
        .send({playerName})
        cookie = playerRes.get("Set-Cookie")
    })

    test('Player retrieval valid', async () => {
        const res = await request(app)
            .get(playerApiRoute)
            .set("Cookie", cookie)
            .send()
        expect(res.status).toBe(200)
        // TODO: Change to isPlayer
        expect(res.body.player).toBeDefined()
    })

    test('Player retrieval no cookie', async () => {
        const res = await request(app)
            .get(playerApiRoute)
            .send()
        expect(res.status).toBe(401)
    })
})