import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion'

const DonutChart = ({x, y}) => {
    const [chartPercentage, setChartPercentage] = useState(20)
    
    useEffect(() => {
         setChartPercentage((y / (x + y)) * 100)
    }, [x, y])

    return (
        <div className='w-1/2 aspect-square relative'>
            <motion.div animate={{background: `conic-gradient(#6441a5 0 ${chartPercentage}%, black 
            ${chartPercentage}% 100%)`}} className='h-full aspect-square rounded-full absolute top-0 left-0'/> 
            <div className='w-1/2 aspect-square rounded-full bg-gray-100 absolute left-1/4 top-1/4'/>
        </div>
    )
}

export default DonutChart