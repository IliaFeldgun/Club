import request from 'supertest'
import app from '../../api/app'

describe("Testing player cookie clear", () => {
    const playerApiRoute = "/api/player"
    const playerName = 'testplayer123'
    let cookie: string[]

    beforeAll(async () => {
        const playerRes = await request(app)
        .post(playerApiRoute)
        .send({playerName})
        cookie = playerRes.get("Set-Cookie")
    })

    test('Player cookie removal valid', async () => {
        const res = await request(app)
            .delete(playerApiRoute)
            .set("Cookie", cookie)
            .send()
        expect(res.status).toBe(200)
        // TODO: Change to isPlayer
        expect(res.get("Set-Cookie")).toBeUndefined()
    })

    test('Player cookie removal no cookie', async () => {
        const res = await request(app)
            .delete(playerApiRoute)
            .send()
        expect(res.status).toBe(401)
    })
})