import logger from "../logs/logger.js"
import axios from 'axios'
import qs from 'qs'
import WhitelistUser from '../models/whitelistUser.js'
import nodemailer from 'nodemailer'

export const getTokens = async (req, res) => {
    try{
        logger.info('getTokens api point used')

        if(req.headers.authorizationcode){
            let result = await axios.post('https://id.twitch.tv/oauth2/token', qs.stringify({
                client_id: process.env.TWITCH_ID,
                client_secret: process.env.TWITCH_SECRET,
                code: req.headers.authorizationcode,
                grant_type: 'authorization_code',
                redirect_uri: `${process.env.WEBSITE_LINK}/home`,
            }), {
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
            })  

            res.status(200).json({accessToken: result.data.access_token, refreshToken: result.data.refresh_token})
        }else{
            res.status(500).json({message: 'Wrong authorization code'})
        }
        
        
    }catch(err){
        logger.error(err)
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const checkToken = async (req, res) => {
    try{
        logger.info('checkToken api point used')
        if(req.headers.accesstoken){

            let result = await axios.get('https://id.twitch.tv/oauth2/validate', {headers: {'Authorization': `Bearer ${req.headers.accesstoken}`}})
            
            let allWhitelistUsers = await WhitelistUser.find({userId: result.data.user_id})

            res.status(200).json({
                login: result.data.login, 
                userId: result.data.user_id, 
                lichessLogin: allWhitelistUsers.length === 1 ? allWhitelistUsers[0].liChessNick : "wpisz swój nick",
                whitelistStatus: allWhitelistUsers.length === 1 ? allWhitelistUsers[0].status : "none",
            }) 
            
        }else{
            res.status(500).json({message: 'Wrong access token code'})
        }
        
        
    }catch(err){
        logger.error(err)
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const refreshToken = async (req, res) => {
    try{
        logger.info('refreshToken api point used')
        if(req.headers.refreshtoken){
            
            let result = await axios.post('https://id.twitch.tv/oauth2/token', qs.stringify({
                client_id: process.env.TWITCH_ID,
                client_secret: process.env.TWITCH_SECRET,
                grant_type: 'refresh_token',
                refresh_token: req.headers.refreshtoken,
            }), {
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
            })  



            res.status(200).json({accessToken: result.data.access_token, refreshToken: result.data.refresh_token})
        }else{
            res.status(500).json({message: 'Wrong acces token code'})
        }
        
        
    }catch(err){
        logger.error(err)
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const askForAcces = async (req, res) => {
    try{
        logger.info('askForAcces api point used')
        if(req.headers.userid && req.headers.login){
            let allWhitelistUsers = await WhitelistUser.find()

            if(allWhitelistUsers.filter(i => i.userId === req.headers.userid).length === 0){
                const accessLink = Math.random().toString(36).slice(-8);
                
                await WhitelistUser.create({userId: req.headers.userid, status: "asked", accessLink: accessLink})
                
                let transporter = nodemailer.createTransport({
                    pool: true,
                    host: process.env.MAIL_HOST,
                    port: 465,
                    secure: true, 
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASSWORD,
                    },
                });
                transporter.verify(function (error, success) {
                    if (error) {
                        logger.error(error);
                    } else {
                        logger.info("SMTP is conected");
                    }
                });

                transporter.sendMail({
                    from: process.env.MAIL_USER,
                    to: process.env.MAIL_TO,
                    subject: "Prośba o dostęp do Chess with Chat",
                    text: `Streamer ${req.headers.login} (id ${req.headers.userid}) prosi o dostęp do Chess with Chat. 
                     \n \n 
                     Jeśli sie zgadzasz wejdź w link: ${process.env.WEBSITE_LINK}/changeAccess?id=${accessLink}?action=accept
                     \n \n 
                     Jeśli chcesz odmówić wejdź w link: ${process.env.WEBSITE_LINK}/changeAccess?id=${accessLink}?action=deny`,
                })
                logger.info('Message send successfull')

                res.status(200).json({message: 'request created'}) 
            }else{
                res.status(500).json({message: 'User already is in data base'})
            }
        }
    }catch(err){
        logger.error(err)
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const changeAccessStatus = async (req, res) => {
    try{
        logger.info('changeAccessStatus api point used')
        if(req.headers.accesslink && req.headers.action){
                let result = await WhitelistUser.find({accessLink: req.headers.accesslink})
                if(result.length === 1){
                    if(req.headers.action === "accept"){
                        await WhitelistUser.findByIdAndUpdate(result[0]._id, {status: "granted", accessLink: ""})

                        res.status(200).json({message: 'access status changed'}) 
                    }else if(req.headers.action === "deny"){
                        await WhitelistUser.findByIdAndUpdate(result[0]._id, {status: "denied", accessLink: ""})
                        res.status(200).json({message: 'access status changed'}) 
                    }else{
                        res.status(500).json({message: 'Something went wrong'})
                    }
                    
                }else{
                    res.status(500).json({message: 'Something went wrong'})
                }
        }else{
            res.status(500).json({message: 'Something went wrong'})
        }
    }catch(err){
        logger.error(err)
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const connectToChat = async (req, res) => {
    try{
        logger.info('connectToChat api point used')
        if(req.headers.accesstoken){

            let result = await axios.get('https://id.twitch.tv/oauth2/validate', {headers: {'Authorization': `Bearer ${req.headers.accesstoken}`}})
            
            let allWhitelistUsers = await WhitelistUser.find()

            if(allWhitelistUsers.filter(i => i.userId === result.data.user_id)[0].status === "granted"){
                console.log(result.data)
                res.status(200).json({message: 'ok!'}) 
            }else{
                res.status(500).json({message: 'Unauthorized'})
            }
            
        }else{
            res.status(500).json({message: 'Wrong access token code'})
        }
        
    }catch(err){
        logger.error(err)
        res.status(500).json({message: 'Something went wrong'})
    }
}