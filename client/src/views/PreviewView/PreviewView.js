import React, {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'
import LoadingDots from '../../components/LoadingDots/LoadingDots'
import WebsocketHandler from './WebsocketHandler/WebsocketHandler'
import Countdown from 'react-countdown'
import DonutChart from '../../components/DonutChart/DonutChart'
import PreviewItem from './PreviewItem/PreviewItem'
import BarChart from '../../components/BarChart/BarChart'
import txtItems from '../../data/txtItems'

const PreviewView = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [showHud, setShowHud] = useState(false)
    const [gameStatus, setGameStatus] = useState('Loading')
    const [WebSocketEnabled, setWebSocketEnabled] = useState(false)
    const [validMoves, setValidMoves] = useState([])
    const [lastMove, setLastMove] = useState("")
    const [timeForVotes, setTimeForVotes] = useState(null)
    const [votes, setVotes] = useState({})
    const [currentPresident, setCurrentPresident] = useState(null)

    useEffect(() => {
      if(cookies.CwC_AccessToken){
        setWebSocketEnabled(true)
      }else{
        setGameStatus("Error")
      }
    }, [])

    useEffect(() => {
      if(gameStatus === "Loading" || gameStatus === "Error" || gameStatus === "Ended" || gameStatus === "Connected"){
        setShowHud(false)
      }else{
        setShowHud(true)
      }
    }, [gameStatus])


    return (
      <div className='w-[350px] h-[450px] bg-gray-100 p-4 flex flex-col justify-center items-center text-2xl text-center'>
        {gameStatus === "Error" && <><p>{txtItems('error')}</p><p onClick={() => window.location.reload()} className='underline cursor-pointer'>{txtItems('reloadPreview')}</p></>}
        {gameStatus === "Ended" && <p>{txtItems('gameStopped')}</p>}
        {gameStatus === "Connected" && <p>{txtItems('gameConnected')}</p>}
        {gameStatus === "Loading" && <><LoadingDots /><p className='mt-8 text-lg'>{txtItems('loading')} </p></>}
        {showHud && <div className='w-full h-full flex flex-col justify-between items-center'>
          {lastMove.length > 0 && <p className=' text-sm text-center'>{txtItems('lastMove')}<span className='font-bold'>{lastMove !== "none" ? lastMove : txtItems('firstRound')}</span></p>}
          <div className='flex-grow w-full flex flex-col flex-center justify-center items-center '>
            {gameStatus === "StreamerMove" && <p className='text-3xl font-bold'>{txtItems('streamerMove')}</p>}
            {gameStatus === "PresidentMove" &&
              <PreviewItem title={`${txtItems('presidentMove')} ${currentPresident}`}>
                <Countdown 
                key={timeForVotes.toString()}
                date={timeForVotes}
                renderer={({seconds}) => <p className='text-3xl text-[#6441a5]'>{seconds}s</p>}
                />
              </PreviewItem>}
            {gameStatus === "ChatMove" && <>
              <PreviewItem timeForVotes={timeForVotes} title={txtItems('chatMove')} desc={txtItems('chatMoveDesc')}>
                <BarChart data={votes} />
              </PreviewItem>
            </>}
            {gameStatus === "SatisfactionSurvey" && <>
              <PreviewItem timeForVotes={timeForVotes} title={txtItems('satisfactionSurvey')} desc={txtItems('satisfactionSurveyDesc')}>
                <DonutChart x={votes.nie ? votes.nie : 0} y={votes.tak ? votes.tak : 0}/>
              </PreviewItem>
            </>}
            {gameStatus === "Election" && <>
              <PreviewItem timeForVotes={timeForVotes} title={txtItems('election')} desc={txtItems('electionDesc')}>
                <p><span className='text-[#6441a5]'>{votes['!zapis'] ? votes['!zapis'] : 0}</span>{txtItems('enrolled')}</p>
              </PreviewItem>
            </>}
          </div>
          <p className='text-sm text-center'>{txtItems('validMoves')}</p>
          <div className='w-full flex flex-wrap justify-center items-center'>
            {validMoves?.map(item => <div key={`validMove${item}`} className='text-xs p-1 rounded bg-[#6441a5] text-white m-[2px]'>{item}</div>)}
          </div>
        </div>} 
        {WebSocketEnabled && <WebsocketHandler 
        setGameStatus={setGameStatus} setValidMoves={setValidMoves} setLastMove={setLastMove} 
        setTimeForVotes={setTimeForVotes} setCurrentPresident={setCurrentPresident} setVotes={setVotes}/>}
      </div>
    )
}

export default PreviewView