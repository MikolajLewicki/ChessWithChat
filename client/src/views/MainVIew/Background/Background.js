import React, {useEffect, useState} from "react";
import optionsStore from '../../../zustand/optionsStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { motion } from "framer-motion"

const Background = () => {
    const background = optionsStore(state => state.background)
    const getBackground = optionsStore(state => state.getBackground)
  
    useEffect(() => {
      getBackground()
    }, [])

    const [isMouseHover, setIsMouseHover] = useState(false)

    return (<>
        <div style={{backgroundImage: `url(${background.img})`}} className=" w-screen h-screen bg-cover bg-center absolute z-[1]" />
        <div style={{backgroundColor: `rgba(117, 117, 117, ${0.2})`}} className="w-screen h-screen absolute top-0 left-0 z-[2]" />
        <div className="absolute top-4 right-4 z-[4] flex flex-col justify-start items-end" onClick={() => setIsMouseHover(!isMouseHover)} onMouseEnter={() => setIsMouseHover(true)} onMouseLeave={() => setIsMouseHover(false)}>
            <FontAwesomeIcon color="#fff" icon={faCircleQuestion}/>
            {isMouseHover && <motion.div className="mt-4 px-4 py-2 cursor-pointer bg-gray-200 rounded-xl" animate={{opacity: isMouseHover ? 1 : 0}}>
                <a href={background.link} target="_blank" className="underline">{background.attribution}</a>
            </motion.div>}
        </div>
        </>)
}

export default Background