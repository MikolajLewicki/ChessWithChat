import React, {useState, useEffect} from 'react'
import Background from '../MainVIew/Background/Background'
import Footer from '../MainVIew/Footer/Footer'
import userStore from '../../zustand/userStore'
import txtItems from '../../data/txtItems'

const ChangeAccessView = () => {
    const changeAccessStatus = userStore(state => state.changeAccessStatus)
    let [errorStatus, setErrorStatus] = useState("")

    useEffect(() => {
        
        if(window.location.search.slice(0, 4) === "?id=" && window.location.search.indexOf("?action") !== -1){
            let accessLink = window.location.search.slice(4, window.location.search.indexOf("?action"))
            let action = window.location.search.slice(window.location.search.indexOf("?action") + 8)
            if(action === "accept" || action === "deny"){
                changeAccessStatus(accessLink, action, setErrorStatus)
            }else{
                setErrorStatus(txtItems('wrongAction'))
            }
        }
    }, [])

    return (
        <div className="w-screen h-screen relative overflow-hidden">
            <Background />
            <div className='absolute top-0 left-0 w-screen h-screen text-white flex justify-center items-center font-bold text-xl z-[5]'>
                <p>{errorStatus}</p>
            </div>
            <Footer />
        </div>
    )
}

export default ChangeAccessView