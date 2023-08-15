import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'

const Select = ({title, options, currentState, stateSetter}) => {

    const [isMobie, setIsMobie] = useState(false)

    useEffect(() => {
        if(window.screen.width > 700){
            setIsMobie(false)
        }else{
            setIsMobie(true)
        }
    }, [window.screen.width])
    return (
        <motion.div className=' w-full mt-8 sm:mt-4 h-[50px] sm:h-10 flex flex-wrap sm:flex-nowrap  justify-start sm:justify-between items-start sm:items-center'>
            <h3 className='order-1 sm:w-1/4 text-lg   sm:h-full flex items-center overflow-hidden whitespace-nowrap '>
                {title}
            </h3>  
            <div className='order-3 sm:order-2 w-full mt-2 sm:mt-0 sm:w-1/2 h-3/4 sm:h-full relative rounded-full border-4 border-[#6441a5]'>
                <div className='w-full h-full absolute left-0 top-0 flex justify-between items-center ' >
                    {options?.map(item => (
                        <div onClick={() => stateSetter(item.value)} className='h-full flex justify-center items-center text-sm z-[8] cursor-pointer' key={`selecItem${item.value}`}
                        style={{width: `${100 / options.length}%`, color: item.value === currentState ? "white" : `${!isMobie ? "black" : "white"}`}} >
                            {item.label}
                        </div>
                    ))}
                </div>
                <motion.div animate={{left: `${options.map(i => i.value).indexOf(currentState) * (100 / options.length)}%`}}
                style={{width: `${100 / options.length}%`}} className='h-full bg-[#6441a5] rounded-full absolute top-0'  />
            </div>
            <h3 className='order-2 sm:order-3 text-lg  ml-2 sm:ml-0 sm:w-1/5 pr-2 flex items-center justify-end  overflow-hidden whitespace-nowrap'>
                {options.filter(i => i.value === currentState)[0].label}
            </h3>  
        </motion.div>
    )
}

export default Select