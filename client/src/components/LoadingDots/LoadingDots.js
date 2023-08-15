import React from 'react'
import { motion } from 'framer-motion'

const LoadingDots = () => {
  return (
    <div className="h-4 w-28 flex relative">
        <motion.span className="w-4 h-4 rounded-full bg-[#6441a5] mr-8 absolute top-0 left-0" 
        initial={{scale: 0, opacity: 0}} animate={{scale: 1, opacity: 1}}
        transition={{ repeat: Infinity, type: 'linear', duration: .6}}></motion.span>
        <motion.span className="w-4 h-4 rounded-full bg-[#6441a5] mr-8"
        initial={{x: 0}} animate={{x: 45}}
        transition={{ repeat: Infinity, type: 'linear', duration: .6}}></motion.span>
        <motion.span className="w-4 h-4 rounded-full bg-[#6441a5] mr-8"
        initial={{x: 0}} animate={{x: 45}}
        transition={{ repeat: Infinity, type: 'linear', duration: .6}}></motion.span>
        <motion.span className="w-4 h-4 rounded-full bg-[#6441a5] mr-0 absolute top-0 right-0" 
        initial={{scale: 1, opacity: 1}} animate={{scale: 0, opacity: 0}}
        transition={{ repeat: Infinity, type: 'linear', duration: .6}}></motion.span>
    </div>
  )
}

export default LoadingDots