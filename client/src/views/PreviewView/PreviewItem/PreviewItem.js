import React from 'react'
import Countdown from 'react-countdown'

const PreviewItem = ({children, timeForVotes, title, desc}) => {
  return (<>
        {children}
        {timeForVotes ? 
            <p className='text-xl'>{title} <Countdown key={timeForVotes.toString()} date={timeForVotes} 
            renderer={({seconds}) => <span className=' text-[#6441a5]'>{seconds}s</span>} /></p>
            : <p className='text-2xl '>{title}</p>
        }
        {desc && <p className='text-lg'>{desc}</p>}
    </> )
}

export default PreviewItem