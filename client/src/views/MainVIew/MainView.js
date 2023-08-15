import React, {useEffect, useState} from "react";
import Background from "./Background/Background";
import Footer from "./Footer/Footer";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import LoginInfo from "./LoginInfo/LoginInfo";
import ContentPanel from "./ContentPanel/ContentPanel";
import { AnimatePresence } from "framer-motion";
import userStore from "../../zustand/userStore"
import ReactGA from "react-ga4";
import {useCookies} from 'react-cookie'

const MainView = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [showPolicy, setShowPolicy] = useState(false)
  const isLoggedIn = userStore(state => state.isLoggedIn)
  const setIsLoggedIn = userStore(state => state.setIsLoggedIn)
  const getTokens = userStore(state => state.getTokens)
  const checkTokens = userStore(state => state.checkTokens)
  
  useEffect(() => {
    setShowPolicy(false)
  }, [isLoggedIn])

  useEffect(() => {
    if(cookies.CwC_CookiesAccepted !== "true"){
      removeCookie('CwC_CookiesAccepted')
      removeCookie('CwC_AccessToken')
      removeCookie('CwC_RefreshToken')
      
    }else{
      ReactGA.initialize(process.env.REACT_APP_GA)

      if(window.location.search.slice(0,5) === "?code"){
        setIsLoggedIn(true)
        getTokens(window.location.search.slice(6, window.location.search.indexOf("&scope")), setCookie, removeCookie)
      }else if (cookies.CwC_AccessToken && cookies.CwC_RefreshToken){
        checkTokens(cookies.CwC_AccessToken, cookies.CwC_RefreshToken, setCookie, removeCookie)
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    }

  }, [])


  return (
    <div  className="w-screen h-screen relative overflow-hidden">
        <Background />
        <div id="content" className="w-screen h-screen absolute top-0 left-0 z-[3] p-[1.5%] sm:[p-2.5%] md:p-[5%] lg:p-[10%] text-white overflow-x-hidden overflow-y-auto ">
          {!isLoggedIn && <>
              <AnimatePresence>
                {showPolicy && <PrivacyPolicy setShowPolicy={setShowPolicy}/>}
              </AnimatePresence>
              {!showPolicy && <LoginInfo setShowPolicy={setShowPolicy}/>}
          </>}
          <AnimatePresence>
            {isLoggedIn && <ContentPanel />}
          </AnimatePresence>
        </div>
        <Footer />
    </div>
  )
}

export default MainView