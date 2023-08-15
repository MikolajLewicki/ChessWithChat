import {create} from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'
import txtItems from '../data/txtItems'

const store = (set) => ({
    startGame: async (options, accessToken, setErrorMsg, setIsContentLoading, lichessNick) => {
        try{
            const result = await api.startGame(options, accessToken, lichessNick)
            

            if(result.status === 204){
                setErrorMsg(txtItems('noFreeBots'))
            }else if(result.status === 200 && result.data.challengeUrl){

                window.open(`${window.location.origin}/preview`, "_blank")
                window.open(result.data.challengeUrl, "_blank")
                setErrorMsg("")
            }else{
                setErrorMsg(txtItems('error'))
            }

            setIsContentLoading(false)
        }catch (err){
            setIsContentLoading(false)
            setErrorMsg(txtItems('error'))
            console.log('err', err)
        }        
    },

})


let gameStore 

if(process.env.REACT_APP_PRODUCTION === "false"){
    gameStore = create(devtools(store))
}else{
    gameStore = create(store)
}

export default gameStore