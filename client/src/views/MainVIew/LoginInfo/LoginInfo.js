import React, {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch } from '@fortawesome/free-brands-svg-icons'
import {useCookies} from 'react-cookie'
import ReactGA from "react-ga4";
import txtItems from '../../../data/txtItems'

const LoginInfo = ({setShowPolicy}) => {
  const [isCookiesAccepted, setIsCookiesAccepted] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    if(cookies.CwC_CookiesAccepted === "true"){
      setIsCookiesAccepted(true)
    }else{
      setIsCookiesAccepted(false)
    }
  }, [cookies])
  
  const handleLogin = () => {
    window.open(process.env.REACT_APP_TWITCH_URL, "_self")
  }
  const handleAcceptCookies = () => {
    let expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 365);
    setCookie('CwC_CookiesAccepted', true, {path: "/", expires: expirationDate})
    ReactGA.initialize(process.env.REACT_APP_GA);
  }

  return (
    <motion.div className='w-full h-full flex flex-col justify-center items-center md:items-start px-[5%] sm:px-[10%] md:px-0 md:pr-[25%] lg:pr-[50%] '
    initial={{y: '20%', opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: .2, delay: .3}}> 
      <h1 className='text-3xl font-bold tracking-wider' style={{fontFamily: 'Caprasimo'}}>{txtItems('name')}</h1>
      <h2 className='text-center md:text-left mt-4 md:mt-0'>{txtItems('loginDesc')} </h2>
      <div className='w-full h-[200px] md:h-[120px] overflow-hidden mt-4 relative'>
        <AnimatePresence>
          {!isCookiesAccepted && <motion.div className='absolute left-0 w-full h-full flex flex-col justify-around md:justify-between ' 
          initial={{top: '100%'}} animate={{top: 0}} exit={{top: '100%'}} transition={{duration: .3, delay: .3}}>
            <p className='text-xs text-center md:text-left'>{txtItems('cookiesDesc')}</p>
            <div className='w-full flex flex-col md:flex-row justify-start items-center'>
              <button onClick={handleAcceptCookies} className='text-center px-4 py-2 rounded-md bg-[#6441a5] hover:bg-[#8c66d1] transition w-[75%] sm:w-[50%] md:w-auto'>
                {txtItems('undestand')}
              </button>
              <button onClick={() => setShowPolicy(true)} className='text-center px-4 py-2 underline rounded-md md:border-2 md:border-solid border-gray-200 sm:ml-4'>
                {txtItems('wantToKnowMore')}
              </button>
            </div> 
          </motion.div>}
        </AnimatePresence>
        <AnimatePresence>
          {isCookiesAccepted && <motion.div className='absolute left-0 w-full h-full flex flex-col justify-center md:justify-between items-center md:items-start'
          initial={{top: '-100%'}} animate={{top: 0}} exit={{top: '-100%'}} transition={{duration: .3, delay: .3}}>
            <button  className='flex flex-row justify-start items-center px-4 py-2 rounded-md bg-[#6441a5] hover:bg-[#8c66d1] transition'
            onClick={handleLogin}>
              <FontAwesomeIcon icon={faTwitch} />
              <p className='ml-2'>{txtItems('logIn')}</p>
            </button>
          </motion.div>}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default LoginInfo