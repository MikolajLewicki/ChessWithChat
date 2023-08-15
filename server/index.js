import express from 'express'
import expressWs from 'express-ws'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import statusRouter from './routes/status.js'
import mongoose from 'mongoose'
import logger from './logs/logger.js'
import helmet from "helmet"
import rateLimit from 'express-rate-limit'
import twitchRouter from './routes/twitch.js'
import lichesshRouter, {mountWsRouter} from './routes/lichess.js'


dotenv.config()
const app = expressWs(express()).app

mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(process.env.PORT || 5000, () => logger.info(`server running on port ${process.env.PORT}`)))
.catch((err) => logger.error(err))


app.use(helmet());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 150, 
	standardHeaders: true, 
	legacyHeaders: false, 
})

app.use(limiter)


app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))

if(process.env.PRODUCTION === 'true'){
  logger.info('Running in producion')
  console.log('Running in producion')
  app.use(cors({
    origin: [`${process.env.WEBSITE_LINK}`]
  }), (req, res, next) => {
    if(req.headers.origin === process.env.WEBSITE_LINK){
        next()
        logger.info('Authorized')
    }else{
        logger.info('unAuthorized')
        res.status(401)
    }
  })
  
}else{
  logger.info('Running in development')
  console.log('Running in development')
  app.use(cors())
}

app.use('/status', statusRouter)
app.use('/twitch', twitchRouter)
app.use('/lichess', lichesshRouter)
mountWsRouter()