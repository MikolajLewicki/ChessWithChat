import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion'

const BarChart = ({data}) => {

    const [chartData, setChartData] = useState([])
    const [allVotes, setAllVotes] = useState([])
    
    useEffect(() => {
        let sortable = []
        let values = 0
        Object.keys(data).forEach((item) => {
            sortable.push([item, data[item]])
        })

        sortable.sort((a, b) => {
            return b[1] - a[1]
        })

        sortable = sortable.slice(0, 4)
        

        sortable.forEach(item => {
            values = values + item[1]
        })

        
        setAllVotes(values)
        setChartData(sortable)

    }, [data])

    return (
        <div className='flex-grow w-full flex items-end justify-around' >
            {chartData.map(item => (
                <div key={`chartItem${item[0]}`} className='w-1/5 h-full flex flex-col justify-end items-center'>
                    <motion.div className='w-full bg-[#6441a5]' animate={{height: `${(item[1] / allVotes) * 100}%`}}/>
                    <p className='text-sm'>{item[0]} ({item[1]})</p>
                </div>
            ))}
        </div>
    )
}

export default BarChart