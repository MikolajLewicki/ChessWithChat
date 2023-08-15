import express from 'express'
import {startGame, getGame} from '../controlers/lichess.js'

const router = express.Router()

router.get('/startGame', startGame)

export const mountWsRouter = () => {
    router.ws('/getGame', getGame); 
  }


export default router  

