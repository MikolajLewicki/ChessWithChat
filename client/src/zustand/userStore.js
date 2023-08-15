import {create} from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'
import txtItems from '../data/txtItems'

const store = (set) => ({
    isLoggedIn: false,
    status: "Loading",
    user: {},
    setIsLoggedIn: async (value) => {
        set((state) => ({isLoggedIn: value}))
    },
    logOut: async (removeCookie) => {
        set((state) => ({status: "Loading", user: {}, isLoggedIn: false}))
        removeCookie('CwC_AccessToken')
        removeCookie('CwC_RefreshToken')
    },
    getTokens: async (authorizationCode, setCookie, removeCookie) => {
        try{
            const data = await api.getTokens(authorizationCode)
            setCookie("CwC_AccessToken", data.data.accessToken)
            setCookie("CwC_RefreshToken", data.data.refreshToken)
            window.history.replaceState(null, "", "/home")
            
            const result = await api.checkToken(data.data.accessToken)

            set((state) => ({status: "Logged", user: result.data}))

        }catch (err){
            console.log('err', err)
            window.history.replaceState(null, "", "/home")
            removeCookie('CwC_AccessToken')
            removeCookie('CwC_RefreshToken')
            set((state) => ({status: "Error"}))
        }        
    },
    checkTokens: async (accessToken, refreshToken, setCookie, removeCookie) => {
        try{
            const result = await api.checkToken(accessToken)

            set((state) => ({status: "Logged", user: result.data}))

            const data = await api.refreshToken(refreshToken)
            setCookie("CwC_AccessToken", data.data.accessToken)
            setCookie("CwC_RefreshToken", data.data.refreshToken)
            
        }catch (err){
            console.log('err', err)
            removeCookie('CwC_AccessToken')
            removeCookie('CwC_RefreshToken')
            set((state) => ({status: "Error"}))
        }        
    },
    askForAcces: async (user, removeCookie) => {
        try{
            const result = await api.askForAcces(user)

            if(result.data.message === "request created"){
                set((state) => ({user: {...state.user, whitelistStatus: "asked"}, }))
            }else{
                set((state) => ({status: "Error"}))
            }
        }catch (err){
            console.log('err', err)
            removeCookie('CwC_AccessToken')
            removeCookie('CwC_RefreshToken')
            set((state) => ({status: "Error"}))
        }        
    },
    changeAccessStatus: async (accessLink, action, setErrorStatus) => {
        try{
            const result = await api.changeAccessStatus(accessLink, action)
            if(result.status === 200){
                window.close()
            }else{
                setErrorStatus(txtItems('error'))
            }
        }catch (err){
            console.log('err', err)
            setErrorStatus(txtItems('error'))
        }        
    },
})


let userStore 

if(process.env.REACT_APP_PRODUCTION === "false"){
    userStore = create(devtools(store))
}else{
    userStore = create(store)
}

export default userStore