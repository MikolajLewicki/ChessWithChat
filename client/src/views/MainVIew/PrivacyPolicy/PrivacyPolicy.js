import React, {useEffect, useState} from 'react'
import ListItem from './ListItem/ListItem'
import ChapterItem from './ChapterItem/ChapterItem'
import privacyPolicyPL from '../../../data/privacyPolicyPL'
import privacyPolicyEN from '../../../data/privacyPolicyEN'
import {motion} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import txtItems from '../../../data/txtItems'

const PrivacyPolicy = ({setShowPolicy}) => {
  const [isMouseHover, setIsMouseHover] = useState(false)
  const [privacyPolicy, setPrivacyPolicy] = useState(privacyPolicyEN)

  useEffect(() => {
    if (/^pl\b/.test(navigator.language)) {
      setPrivacyPolicy(privacyPolicyPL)
    }
  }, [])

  return (
    <>
    <motion.div className='w-full h-full flex flex-col md:flex-row justify-between items-start ' 
    initial={{x: '100%'}} animate={{x: 0}} exit={{x: '100%'}} transition={{duration: .3}}>
        <ul className='w-full md:w-1/4 h-full flex flex-col items-around'>
            <h2 className='font-bold text-xl mb-4'>{txtItems('tableOfContent')}</h2>
            {privacyPolicy.map((item, index) => <ListItem item={item} index={index} />)}
        </ul>
        <div className='w-full md:w-3/5 md:h-full flex flex-col md:overflow-y-auto mt-8 md:mt-0 pb-8 md:pb-0'>
            {privacyPolicy.map((item, index) => <ChapterItem item={item} index={index}/>)}
        </div>
    </motion.div>
    <motion.div className='fixed top-0 right-0 px-4 h-full w-4 flex justify-center items-center text-3xl z-[4] cursor-pointer text-gray-200' 
    initial={{opacity: 0}} animate={{opacity: 1, backgroundColor: `rgba(117, 117, 117, ${isMouseHover ? 0.2 : 0})`}} exit={{opacity: 0}}
    onMouseEnter={() => setIsMouseHover(true)} onMouseLeave={() => setIsMouseHover(false)} onClick={() => setShowPolicy(false)}>
      <FontAwesomeIcon icon={faChevronRight} />
    </motion.div>
    </>
  )
}

export default PrivacyPolicy