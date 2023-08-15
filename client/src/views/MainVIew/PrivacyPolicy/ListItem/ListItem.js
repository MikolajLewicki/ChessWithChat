import React from 'react'

const ListItem = ({item, index}) => {
    const handleClick = () => {
        if(document.getElementById(item.title)){
            document.getElementById(item.title).scrollIntoView({ behavior: "smooth", block: "start" })
        } 
    }

    return (
        <li onClick={handleClick} className='underline mt-2 cursor-pointer'>{`${index + 1}. ${item.title}`}</li>
    )
}

export default ListItem