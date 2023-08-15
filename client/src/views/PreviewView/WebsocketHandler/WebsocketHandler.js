import React from 'react'
import useWebSocket from 'react-use-websocket';
import {useCookies} from 'react-cookie'

const WebsocketHandler = ({setGameStatus, setValidMoves, setLastMove, setTimeForVotes, setCurrentPresident, setVotes}) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const socketUrl = `wss${process.env.REACT_APP_API_URL.slice(5)}lichess/getGame`

    const { sendMessage, lastJsonMessage } = useWebSocket(socketUrl, {
        onOpen: () => {console.log('connected to web socket'); sendMessage(cookies.CwC_AccessToken)},
        onMessage: (msg) => {
            let data = JSON.parse(msg.data)
            if(data.status === "ok"){
                if(data.data.gameStatus){
                    setGameStatus(data.data.gameStatus)
                }
                if(data.data.validMoves){
                    setValidMoves(data.data.validMoves)
                }
                if(data.data.lastMove){
                    setLastMove(data.data.lastMove)
                }
                if(data.data.timeForVotes){
                    setTimeForVotes(new Date(data.data.timeForVotes))
                }
                if(data.data.currentPresident){
                    setCurrentPresident(data.data.currentPresident)
                }
                if(data.data.votes){
                    setVotes(data.data.votes[0])
                }
            }else{
                setGameStatus('Error')
            }
        },
        onerror: (err) => console.log(err),
        shouldReconnect: (closeEvent) => true,
      });

    return (
        <></>
    )
}

export default WebsocketHandler