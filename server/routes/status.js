
import express from 'express'
import {getStatus} from '../controlers/status.js'

const router = express.Router()

router.get('/getStatus', getStatus)


export default router  