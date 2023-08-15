import express from 'express'
import {getTokens, checkToken, refreshToken, connectToChat, askForAcces, changeAccessStatus} from '../controlers/twitch.js'

const router = express.Router()

router.get('/getTokens', getTokens)
router.get('/checkToken', checkToken)
router.get('/refreshToken', refreshToken)
router.get('/connectToChat', connectToChat)
router.get('/askForAcces', askForAcces)
router.get('/changeAccessStatus', changeAccessStatus)


export default router  

