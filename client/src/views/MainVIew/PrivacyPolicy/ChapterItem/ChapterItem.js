import React from 'react'
import {motion} from 'framer-motion'

const ChapterItem = ({item, index}) => {

    return (
        <motion.div id={item.title} className='w-full flex flex-col justify-start items-start mb-8 text-md md:text-lg'>
            <h3 className='font-bold'>{`${index + 1}. ${item.title}`}</h3>
            {item?.paragraphs?.map(paragraphContent => (
                <p className='mt-4'>{paragraphContent}</p>
            ))}
        </motion.div>
    )
}

export default ChapterItem