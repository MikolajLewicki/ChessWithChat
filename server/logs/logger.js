import {createLogger, transports, format} from 'winston'

const customFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `[${info.level.toUpperCase().padEnd(7)}]: ${info.message} - ${info.timestamp} `
  }))

const logger = createLogger({
    format: customFormat,
    transports: [
        new transports.Console({level: 'error'}),
        new transports.File({filename: 'logs/activity.log', level: 'info', maxFiles: '14d'}),
        new transports.File({filename: 'logs/errors.log', level: 'error', maxFiles: '14d'}),
    ]
})

export default logger