import request from 'supertest'
import app from '../../api/app'
import Room from '../../engine/lobby/models/Room'
import IRoom from '../../engine/lobby/interfaces/Room'

describe("Testing room retrieval", () => {
    const playerApiRoute = "/api/player"
    const playerName = 'testplayer123'
    let cookie: string[]
    const roomCreateApiRoute = '/api/room'
    
    let createdRoomId: string
    const roomGetRoute = (roomId: string) => {return `/api/room/${roomId}`}
    
    beforeAll(async () => {
        const playerRes = await request(app)
        .post(playerApiRoute)
        .send({playerName})
        cookie = playerRes.get("Set-Cookie")
        const roomRes = await request(app)
        .post(roomCreateApiRoute)
        .set("Cookie", cookie)
        .send()
        createdRoomId = roomRes.body.roomId
    })
    
    test('Room retrieval valid', async () => {
        const res = await request(app)
            .get(roomGetRoute(createdRoomId))
            .set("Cookie", cookie)
            .send()
        expect(res.status).toBe(200)
        // TODO: Change to isRoom
        expect(res.body.room).toBeDefined()
    })

    test('Room retrieval no cookie', async () => {
        const res = await request(app)
            .get(roomGetRoute(createdRoomId))
            .send()
        expect(res.status).toBe(401)
    })

    test('Room retrieval invalid', async () => {
        const res = await request(app)
            .get(roomGetRoute("$;--INJECTIONS"))
            .set("Cookie", cookie)
            .send()
        expect(res.status).toBe(400)
    })

    test('Room retrieval wrong ID', async () => {
        const res = await request(app)
            .get(roomGetRoute(createdRoomId.replace('a','b')))
            .set("Cookie", cookie)
            .send()
        expect(res.status).toBe(500)
    })
})