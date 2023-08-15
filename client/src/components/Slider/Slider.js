import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'

const Slider = ({title, options, currentState, stateSetter}) => {
        
        return (
            <motion.div className='w-full mt-8 sm:mt-4 h-[50px] sm:h-10 flex flex-wrap sm:flex-nowrap  justify-start sm:justify-between items-start sm:items-center'
            initial={{y: 40, opacity: 0}} animate={{y: 0, opacity: 1, transition: {duration: .3}}}>
                    <h3 className='order-1 sm:w-1/4 text-lg sm:text-normal flex items-center pr-2 sm:h-full overflow-hidden whitespace-nowrap'>
                        {title}
                    </h3>  
                    <div className='order-3 sm:order-2 h-3/4 w-full sm:w-1/2 sm:h-full relative'>
                        <div className='w-full h-full absolute top-0 left-0 flex items-center'>
                            <div className='w-full h-2 bg-[#6441a5] grayscale rounded-xl z-[6]' />
                        </div>
                        <motion.div className='h-full absolute top-0 left-0 flex items-center' 
                        animate={{width: `${options.indexOf(currentState) * (100 / (options.length - 1)) }%`}}>
                            <div className='w-full h-3 sm:h-2 bg-[#6441a5] rounded-xl z-[7]' />
                        </motion.div>
                        <div className='w-full h-full absolute top-0 left-0 flex justify-between items-center'>
                            {options?.map(item => (
                                <motion.div key={`sliderItem${item}`} onClick={() => stateSetter(item)} className='h-3/4 aspect-square rounded-full bg-[#6441a5] z-[7] cursor-pointer '
                                animate={{filter: `grayscale(${options.indexOf(item) <= options.indexOf(currentState) ? 0 : 100}%)`}} />
                            ))}
                        </div>
                    </div>
                    <h3 className='order-2 sm:order-3 sm:w-1/5 text-lg sm:text-xl pr-2 flex items-center justify-end  sm:h-full overflow-hidden whitespace-nowrap'>
                        {currentState}
                    </h3>  
            </motion.div>  
        )
}

export default Slider