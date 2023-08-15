import create from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'
import backgrounds from '../data/backgrounds'

const store = (set) => ({
    background: {},
    getBackground: async () => {
        set((state) => ({background: backgrounds[Math.floor(Math.random()*backgrounds.length)]}))
    },
})


let optionsStore 

if(process.env.REACT_APP_PRODUCTION === "false"){
    optionsStore = create(devtools(store))
}else{
    optionsStore = create(store)
}

export default optionsStore