import React, {useState, useEffect} from 'react'
import userStore from '../../../zustand/userStore'
import gameStore from '../../../zustand/gameStore'
import {motion, AnimatePresence} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import {useCookies} from 'react-cookie'
import Slider from '../../../components/Slider/Slider'
import Select from '../../../components/Select/Select'
import txtItems from '../../../data/txtItems'

const ContentPanel = () => {

  const [cookies, setCookie, removeCookie] = useCookies();
  const status = userStore(state => state.status)
  const user = userStore(state => state.user)
  const logOut = userStore(state => state.logOut)
  const askForAcces = userStore(state => state.askForAcces)
  const startGame = gameStore(state => state.startGame)

  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [gameDuration, setGameDuration] = useState("10min")
  const [typeOfGame, setTypeOfGame] = useState("1vsChat")
  const [piecesColor, setPiecesColor] = useState("Dowolne")
  const [timeForChat, setTimeForChat] = useState("45s")
  const [timeForPresident, setTimeForPresident] = useState("45s")
  const [timeForElection, setTimeForElection] = useState("30s")
  const [errorMsg, setErrorMsg] = useState("")
  const [isContentLoading, setIsContentLoading] = useState(false)
  const [lichessNick, setLichessNick] = useState(txtItems('enterNick'))
  const [currentLang, setCurrentLang] = useState("en")
  const [isMobie, setIsMobie] = useState(false)

  const handleLogOut = () => {
    logOut(removeCookie)
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleAskForWhitelist = () => {
    askForAcces(user, removeCookie)
  }

  const handleStartGame = async () => {
    if(lichessNick.length > 0 && lichessNick !== txtItems('enterNick')){
      
      startGame({
        currentLang,
        gameDuration, 
        typeOfGame, 
        piecesColor, 
        timeForChat, 
        timeForPresident, 
        timeForElection
      }, 
      cookies.CwC_AccessToken, 
      setErrorMsg, 
      setIsContentLoading, 
      lichessNick)

      setIsContentLoading(true)
    }else{
      setErrorMsg(txtItems('pleaseEnterNick'))
    }
  }

  useEffect(() => {
    if(user.lichessLogin){
      setLichessNick(user.lichessLogin)
    }
  }, [user])

  useEffect(() => {
    if (/^pl\b/.test(navigator.language)) {
      setCurrentLang('pl')
    }
  }, [currentLang])

  useEffect(() => {
      if(window.screen.width > 700){
          setIsMobie(false)
      }else{
          setIsMobie(true)
      }
  }, [window.screen.width])

  return (
    <motion.div className='absolute right-[1.5%] sm:right-[10%] sm:bottom-[10%]  w-[97%] sm:w-[650px]  flex flex-col   sm:bg-white rounded-xl text-white
     sm:text-black px-[2.5%] py-[1%]' transition={{duration: .3, delay: .3}} initial={{opacity: 0, height: '30%'}} animate={!isMobie ? 
    {opacity: 1, height: user.whitelistStatus === "granted" ? '500px' : '250px'}:
    {opacity: 1, height: user.whitelistStatus === "granted" ? '90%' : '70%'}}> 
      {status === "Loading" && <div className='flex-grow flex justify-center items-center text-xl font-bold text-gray-400'> 
        <p>{txtItems('loading')}</p>
      </div>}
      {status === "Error" && <div className='flex-grow flex justify-center items-center text-xl font-bold text-red-400'> 
        <p className='cursor-pointer' onClick={() => window.location.reload()}>{txtItems('error')} <FontAwesomeIcon icon={faArrowsRotate} /></p>
      </div>}
      {status === "Logged" && <>
      {user.login && <motion.div className='w-full flex flex-row justify-between items-center text-lg '
      initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: .3}}}>
        <p>{txtItems('hello')} 
          <span className='font-bold ml-2'>{user.login}</span> 
          {user.whitelistStatus === "granted" && 
          <span onClick={() => setShowMoreInfo(!showMoreInfo)} onMouseEnter={() => setShowMoreInfo(true)} onMouseLeave={() => setShowMoreInfo(false)}
          className='text-blue-500 cursor-pointer ml-2'><FontAwesomeIcon icon={faCircleQuestion} /></span>}
          <span onClick={handleRefresh} className='text-yellow-500 cursor-pointer ml-2'><FontAwesomeIcon icon={faArrowsRotate} /></span>
          <span onClick={handleLogOut} className='text-red-500 cursor-pointer ml-2'><FontAwesomeIcon icon={faRightFromBracket} /></span>
        </p>
      </motion.div>}
      <div className='flex-grow flex flex-col justify-center items-center text-xl font-bold'>
        {user.whitelistStatus === "none" && <p onClick={handleAskForWhitelist} className='underline mt-4 cursor-pointer '>{txtItems('whiteListAsk')}</p>}
        {user.whitelistStatus === "asked" && <p className='mt-4'>{txtItems('whiteListProcessing')}</p>}
        {user.whitelistStatus === "denied" && <p className='mt-4'>{txtItems('whiteListDenied')}</p>}
        {user.whitelistStatus === "granted" && <>
        <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: .3}}} className='w-full flex flex-row justify-start items-center text-lg mb-4 '>
          Lichess: <input type='text' className='ml-2 outline-none font-normal bg-transparent' value={lichessNick} onChange={(e) => setLichessNick(e.target.value)}/>
        </motion.div>
        <div className='w-full h-full relative'>
          <motion.div className='w-full h-full flex flex-col font-normal absolute top-0 left-0' initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: .3}}}>
            <Select 
              title={txtItems('colorOfPieces')}
              options={[{value: "Dowolne", label: txtItems('random')}, {value: "Biale", label: txtItems('white')}, {value: 'Czarne', label: txtItems('black')}]}
              currentState={piecesColor}
              stateSetter={setPiecesColor}
            />  
            <Select 
                  title={txtItems('gameType')}
                  options={[{value: "1vsChat", label: txtItems('streamerVsChat')}, {value: "Prezydent", label: txtItems('presidentGame')}]}
                  currentState={typeOfGame}
                  stateSetter={setTypeOfGame}
            />  
            <Slider 
              title={txtItems('gameDuration')}
              options={["10min", "20min", "30min", "40min", "60min"]}
              currentState={gameDuration}
              stateSetter={setGameDuration}
            />
            <div className='w-full flex flex-col'>
              {typeOfGame === "1vsChat" && <Slider 
                title={txtItems('chatTime')} 
                options={["45s", "60s", "90s", "120s"]}
                currentState={timeForChat}
                stateSetter={setTimeForChat}
              />}
              {typeOfGame === "Prezydent" && <Slider 
                title={txtItems('electionTime')}
                options={[ "30s", "45s", "60s", "90s"]}
                currentState={timeForPresident}
                stateSetter={setTimeForPresident}
              />}
              {typeOfGame === "Prezydent" && <Slider 
                title={txtItems('presidentTime')}
                options={["20s", "30s", "45s", "60s"]}
                currentState={timeForElection}
                stateSetter={setTimeForElection}
              />}
            </div>
            <div className='flex-grow flex justify-center items-end'>
              <div className='w-4/5 sm:w-1/2 py-2 mx-auto flex justify-center items-center rounded bg-[#6441a5]
               text-white hover:bg-[#8c66d1] transition'
               onClick={handleStartGame} style={{cursor: isContentLoading ? "auto" : "pointer", filter: `grayscale(${isContentLoading ? 100 : 0}%)`}}
               >{isContentLoading ? txtItems('loading') : txtItems('start')}</div>
            </div>
            <p className='w-full text-center text-sm mt-2 text-red-400'>{errorMsg}</p>     
          </motion.div>
          <AnimatePresence>
            {showMoreInfo && <motion.div className='z-[9] absolute w-full h-full top-0 left-0 rounded-xl text-black  p-2 text-base	 
            sm:text-xl overflow-hidden bg-white flex flex-col justify-start sm:justify-around items-start font-normal' 
            initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
              <p className='mt-4'><span className='font-bold'>{txtItems('intructionTitle')}</span>{txtItems('instructionDesc')}</p>
              <p className='mt-4'><span className='font-bold'>{txtItems('streamerVsChat')}</span>{txtItems('instruction1vC')} </p>
              <p className='mt-4'><span className='font-bold'>{txtItems('presidentGame')}</span>{txtItems('instructionPresident')} </p>
              <p className="mx-auto text-sm text-gray-400 text-center flex flex-grow items-end sm:block mt-2">{txtItems('instructionQuestions')}</p>
            </motion.div>}
          </AnimatePresence>
        </div></>}
      </div></>}
    </motion.div>
  )
}

export default ContentPanel