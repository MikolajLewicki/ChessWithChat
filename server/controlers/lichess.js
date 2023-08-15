import logger from "../logs/logger.js"
import axios from 'axios'
import Bots from "../models/bots.js"
import WhitelistUser from "../models/whitelistUser.js"
import qs from 'qs'
import fetch from "node-fetch";
import readStream from '../botUtilities/readNdjsonStream.js'
import {Position} from 'kokopu'
import * as tmi from 'tmi.js'

export const startGame = async (req, res) => {
    try{
        logger.info('startGame api point used')
        let options = JSON.parse(req.headers.options)
        let result = await axios.get('https://id.twitch.tv/oauth2/validate', {headers: {'Authorization': `Bearer ${req.headers.accesstoken}`}})
        let twitchUser = result.data

        let whiteListItem = await WhitelistUser.find({userId: twitchUser.user_id})
        await WhitelistUser.findByIdAndUpdate(whiteListItem[0]._id, {liChessNick: req.headers.lichessnick})

        let botsWithUser = await Bots.find({currentPlayer: twitchUser.user_id})

        if(botsWithUser.length > 0 ){
            for(let i = 0; i < botsWithUser.length; i++){
                await Bots.findByIdAndUpdate(botsWithUser[i], {currentPlayer: "none", gameStatus: "Ended", validMoves: [], lastMove: "none", currentPresident: "", votes: []})
            }
        }
        
        let freeBots = await Bots.find({currentPlayer: "none"})

        if(freeBots.length === 0){
            res.status(204).json({message: 'No free bots'})
        }else{
            let currentBot = freeBots[0]
            await Bots.findByIdAndUpdate(currentBot._id, {currentPlayer: twitchUser.user_id, gameStatus: 'Connected'})
            
            let color = "random"

            switch(options.piecesColor) {
                case 'Dowolne':
                    color = "random"
                    break;
                case 'Biale':
                    color = "white"
                    break;
                case 'Czarne':
                    color = "black"
                    break;
            }
            
            
            let validateUser = await axios.get(`https://lichess.org/api/user/${req.headers.lichessnick}`, {headers: {'Authorization': `Bearer ${currentBot.token}`}})

              let startGameStream = fetch(`https://lichess.org/api/challenge/${req.headers.lichessnick}`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Authorization': `Bearer ${currentBot.token}`
                },
                body: qs.stringify({
                "rated": false,
                "clock.limit": parseInt(options.gameDuration.slice(0,2)) * 60,
                "clock.increment": 0,
                "color": color,  
                "variant": "standard",
                "keepAliveStream": true,
             })})

             let gameId = ""

             const startGameStreamCompleteHandler = () => logger.info('The startGameStream has completed');

             const startGameStreamMsgHandler = async (obj) => {
               if(obj.challenge){
                   gameId = obj.challenge.id
                   res.status(200).json({challengeUrl: obj.challenge.url})
               }else if(obj.done === "accepted"){
                   let gameStream = fetch(`https://lichess.org/api/bot/game/stream/${gameId}`,  {headers: { 
                       "Content-Type": "application/x-ndjson",
                       'Authorization': `Bearer ${currentBot.token}`
                     }})
       
                     gameStream
                       .then(readStream(gameStreamMsgHandler))
                       .then(gameStreamCompleteHandler);
               }
             }


            startGameStream
            .then(readStream(startGameStreamMsgHandler))
            .then(startGameStreamCompleteHandler);

             
             const gameStreamCompleteHandler = async () => {
                isGameFinished = true
                chatClient.disconnect()
                console.log('The gameStream has completed')
                await Bots.findByIdAndUpdate(currentBot._id, {currentPlayer: "none", gameStatus: "Ended", validMoves: [], lastMove: "none", currentPresident: "", votes: {}})
            }

             let position
             let chatClient
             let validMoves
             let movesHistory = ""
             let isBotMove = false
             let votes = {}
             let results = {}
             let votingType = "move"
             let first = true
             let currentPresident = ""
             let isGameFinished = false
             
             const vote = async () => {
                    const runTimeout = async (time) => {
                        let newDate = new Date()
                        newDate.setTime(newDate.getTime() + time)

                        await Bots.findByIdAndUpdate(currentBot._id, {timeForVotes: newDate})
                        return new Promise(resolve => setTimeout(async () => { 
                            if(isGameFinished){
                                await Bots.findByIdAndUpdate(currentBot._id, {currentPlayer: "none", gameStatus: "Ended", validMoves: [], lastMove: "none", currentPresident: "", votes: {}})
                            }else{
                                resolve()
                            }
                        }, time))
                    }

                    const changeMoveType = async (value) => {
                        votingType = value
                        votes = {}
                        results = {} 
                        await Bots.findByIdAndUpdate(currentBot._id, {votes: {}})
                    }

                    const moveVoting = async () => {
                            let move = "ruch"
                            
                            console.log("Głosowanie zostało zakończone o to wyniki")
                            console.log(results)
                            console.log("--------------------")
                            if(Object.keys(results).length > 0){
                                let sortable = [];
                                for (let item in results) {
                                    sortable.push([item, results[item]]);
                                }
                                sortable.sort((a, b) => {
                                    return b[1] - a[1]
                                })
                                console.log("Zwyciężyło ", sortable[0][0])
                                move = sortable[0][0]
                                await Bots.findByIdAndUpdate(currentBot._id, {lastMove: `${move} (${options.typeOfGame === "1vsChat" ? "Chat" : `${options.currentLang === "pl" ? "Prezydent" : "President"}`})`})
                            }else{
                                console.log("Brak głosów, zwyciężyło: ", validMoves[0].name)
                                move = validMoves[0].name
                                await Bots.findByIdAndUpdate(currentBot._id, {lastMove: `${move} (${options.currentLang === "pl" ? "losowo" : "Random"})`})
                            }
                            console.log("--------------------")
                            try{
                                await axios.post(`https://lichess.org/api/bot/game/${gameId}/move/${move}`, {}, {headers: {'Authorization': `Bearer ${currentBot.token}`}})
                            }catch(err){
                                console.log(err)
                            }
                       
                    }

                    const election = async () => {
                        let allCandidates = Object.keys(votes)
                        currentPresident = allCandidates[Math.floor((Math.random()*allCandidates.length))]
                        return currentPresident
                    }
                    const satisfactionSurvay = async () => {
                        let sortable = [];
                        for (let item in results) {
                             sortable.push([item, results[item]]);
                        }
                        sortable.sort((a, b) => {
                            return b[1] - a[1]
                        })
                        if(sortable.length > 0 && sortable[0][0] === "tak"){
                            return true
                        }else{
                            return false
                        }
                         
                    }

                    if(options.typeOfGame === "Prezydent"){
                        let isChatHappy = true
                        if(currentPresident){
                            changeMoveType("satisfaction")
                            await Bots.findByIdAndUpdate(currentBot._id, {gameStatus: "SatisfactionSurvey"})
                            console.log("Czy jesteś zadowolonty z prezydenta? ")
                            await runTimeout(15 * 1000)
                            isChatHappy = await satisfactionSurvay()
                            if(isChatHappy){
                                console.log("Czat wskazał że jest zadwolony z prezydenta ")
                                console.log("--------------------")
                            }else{
                                console.log("Czat wskazał że nie jest zadwolony z prezydenta ")
                                console.log("--------------------")
                            }
                        }
                        if(!isChatHappy || !currentPresident){
                            changeMoveType("election")
                            await Bots.findByIdAndUpdate(currentBot._id, {gameStatus: "Election"})
                            console.log('trwają wybory, wpisz !zapis aby zgłosić kandydature')
                            await runTimeout(parseInt(options.timeForElection.slice(0,-1)) * 1000)
                            let president = await election()
                            if(president){
                                await Bots.findByIdAndUpdate(currentBot._id, {currentPresident: president})
                                console.log(`Wybrano kandydata:  ${president}`)
                                console.log("--------------------")
                            }else{
                                await Bots.findByIdAndUpdate(currentBot._id, {currentPresident: ""})
                                console.log(`Nikt nie zgłosił swojej kandydatury`)
                                console.log("--------------------")
                            }

                        }
                        changeMoveType("move")
                        if(currentPresident){
                            await Bots.findByIdAndUpdate(currentBot._id, {gameStatus: "PresidentMove"})
                            console.log("czas na wskazanie ruchu prezydenta")
                            console.log("możliwe ruchy to:", validMoves.map(i => i.name))
                            await runTimeout(parseInt(options.timeForPresident.slice(0,-1)) * 1000)
                            await moveVoting()
                        }else{
                            console.log("Brak głosów, zwyciężyło: ", validMoves[0].name)
                            console.log("--------------------")
                            await Bots.findByIdAndUpdate(currentBot._id, {lastMove: `${validMoves[0].name} (${options.currentLang === "pl" ? "Losowo" : "Random"})`})
                            try{
                                await axios.post(`https://lichess.org/api/bot/game/${gameId}/move/${validMoves[0].name}`, {}, {headers: {'Authorization': `Bearer ${currentBot.token}`}})
                            }catch(err){
                                console.log(err)
                            }
                        }
                        
                        
                        
                    }else if (options.typeOfGame === "1vsChat"){
                        changeMoveType("move")
                        await Bots.findByIdAndUpdate(currentBot._id, {gameStatus: "ChatMove"})
                        console.log("czas na głosowanie")
                        console.log("możliwe ruchy to:", validMoves.map(i => i.name))
                        await runTimeout(parseInt(options.timeForChat.slice(0,-1)) * 1000)
                        await moveVoting()
                        
                    }
                    first = false
             }

             const gameStreamMsgHandler = async (obj) => {
                if(obj.type === "gameState" && obj.moves !== movesHistory){
                    movesHistory = obj.moves
                    await position.play([...validMoves].filter(i => i.name === obj.moves.split(" ").slice(-1)[0])[0].value)
                    validMoves = position.moves().map(i => ({name: position.uci(i), value: i}))
                    await Bots.findByIdAndUpdate(currentBot._id, {validMoves: validMoves.map(i => i.name)})
                    let isCheck = await position.isCheckmate()
                    if(!isCheck){
                        if(isBotMove){
                            await Bots.findByIdAndUpdate(currentBot._id, {lastMove: `${obj.moves.split(" ").slice(-1)[0]} (Streamer)`})
                            vote()
                        }else{
                            console.log("Ruch steamera")
                            console.log("--------------------")
                            await Bots.findByIdAndUpdate(currentBot._id, {gameStatus: "StreamerMove"})
                        }
                    }else{
                        console.log("Szach mat!")
                    }
                    
                    isBotMove = !isBotMove
                    
                }else if(obj.type === "gameFull"){
                    position = new Position()
                    validMoves = position.moves().map(i => ({name: position.uci(i), value: i}))
                    await Bots.findByIdAndUpdate(currentBot._id, {validMoves: validMoves.map(i => i.name)})
                    if(obj.white.title === "BOT"){
                        vote()
                    }else{ 
                        console.log("--------------------")
                        console.log("Ruch steamera")
                        console.log("--------------------")
                        await Bots.findByIdAndUpdate(currentBot._id, {gameStatus: "StreamerMove"})
                        isBotMove = true
                    }
                    chatClient = new tmi.Client({
                        options: { debug: false },
                        identity: {
                            username: twitchUser.login,
                            password: `oauth:${req.headers.accesstoken}`
                        },
                        channels: [ twitchUser.login ]
                    });
                    chatClient.on('message', async (channel, tags, message, self) => {
                        if(validMoves.length > 0){
                            let msgSplitted = message.split(" ")

                            switch(votingType){
                                case 'move':
                                    if(options.typeOfGame === "Prezydent"){
                                        if(tags.username === currentPresident){
                                            await msgSplitted.forEach(i => {
                                                if(validMoves.map(i => i.name).includes(i.toLowerCase())){
                                                    votes[tags.username] = i.toLowerCase()  
                                                }
                                            })
                                        }
                                    }else{
                                        await msgSplitted.forEach(i => {
                                            if(validMoves.map(i => i.name).includes(i.toLowerCase())){
                                                votes[tags.username] = i.toLowerCase()  
                                            }
                                        })
                                    }
                                    break;
                                case 'satisfaction':
                                    await msgSplitted.forEach(i => {
                                        if(options.currentLang === "pl"){
                                            if(i.toLowerCase() === "tak" || i.toLowerCase() === "nie"){
                                                votes[tags.username] = i.toLowerCase()  
                                            }
                                        }else{
                                            if(i.toLowerCase() === "yes"){
                                                votes[tags.username] = "tak" 
                                            }else if(i.toLowerCase() === "no"){
                                                votes[tags.username] = "nie" 
                                            }
                                        }
                                    })
                                    break;
                                case 'election':
                                    await msgSplitted.forEach(i => {
                                        if(options.currentLang === "pl"){
                                            if(i.toLowerCase() === "!zapis"){
                                                votes[tags.username] = i.toLowerCase()  
                                            }
                                        }else{
                                            if(i.toLowerCase() === "!enroll"){
                                                votes[tags.username] = "!zapis"
                                            }
                                        }

                                    })
                                    break;
                            }

                            results = {}

                            await Object.keys(votes).forEach(function(key, index) {
                                
                                 if(typeof(results[votes[key]]) !== "undefined"){
                                    results[votes[key]] = results[votes[key]] + 1
                                }else{
                                    results[votes[key]] = 1
                                }
                                
                            });
                            await Bots.findByIdAndUpdate(currentBot._id, {votes: results})
                            console.log(results)
                        }   
                    });
                    
                    chatClient.connect();
                }
              }

            }
    }catch(err){
            logger.error(err)
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const getGame = (ws, req) => {
    ws.on('message', async (msg) => {
        try{
            logger.info('getGame api point used')

            let result = await axios.get('https://id.twitch.tv/oauth2/validate', {headers: {'Authorization': `Bearer ${msg}`}})
            let twitchUser = result.data

            let botsRes = await Bots.find({currentPlayer: twitchUser.user_id})
            if(botsRes.length === 1){
                let bot = botsRes[0]
                ws.send(JSON.stringify({status: "ok", data: {gameStatus: bot.gameStatus, 
                    validMoves: bot.validMoves, lastMove: bot.lastMove, timeForVotes: bot.timeForVotes, 
                    votes: bot.votes, currentPresident: bot.currentPresident}}))
                Bots.watch().on('change', (data) => {
                    if(data.documentKey._id.equals(bot._id)){
                        ws.send(JSON.stringify({status: "ok", data: data.updateDescription.updatedFields}))
                    }
                })
            }else{
                ws.send(JSON.stringify({status: 'error', msg: "Didnt find connected bot"}))
            }
        }catch(err){
            logger.error(err)
            ws.send(JSON.stringify({status: 'error', msg: "something went wrong"}))
        }
    })
}

