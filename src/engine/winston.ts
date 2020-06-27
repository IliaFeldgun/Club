import winston from "winston"
const isDev = process.env.ENVIRONMENT === "DEV"

const logger = winston.createLogger( {
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service'},
    transports: [
        new winston.transports.Console({stderrLevels: ['error'], consoleWarnLevels: ['warn'], silent: !isDev}),
        new winston.transports.File({ filename: 'error.log', level: 'error', silent: !isDev}),
        new winston.transports.File({ filename: 'combined.log', silent: !isDev })
    ]
})

export default logger