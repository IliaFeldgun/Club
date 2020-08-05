import session from 'express-session'
import ConnectRedis from 'connect-redis'
import {redisSessionClient} from '../data_stores/redis'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const COOKIE_SECRET = process.env.COOKIE_SECRET
const SECURE = IS_PRODUCTION

const RedisStore = ConnectRedis(session)
const configuredSession = session({
    store: new RedisStore({
        client: redisSessionClient,
        prefix: "lobbysession:",
        ttl: 86400, // 1 day
    }),
    secret: COOKIE_SECRET,
    cookie: {
        signed: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 86400 * 1000, // 1 day, milliseconds for some reason
        path: "/api",
        secure: SECURE
    },
    name: "club.connect.sid",
    resave: false,
    unset: "destroy",
    saveUninitialized: false
})

export default configuredSession