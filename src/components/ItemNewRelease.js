import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import moment from "moment"
import "moment/locale/vi"

const ItemNewRelease = ({ item }) => {
    const [isHover, setIsHover] = useState(false)

    return (
        <div
            onMouseEnter={() => { setIsHover(true) }}
            onMouseLeave={() => { setIsHover(false) }}
            className='grid grid-cols-[20%,70%] gap-2 hover:bg-sidebarbg p-2 rounded-md'>
            <div className='relative rounded-md overflow-hidden h-[60px] w-[60px]'>
                <img src={item?.thumbnail} className='rounded-md object-cover w-full h-full' />
                <div className={`${isHover ? 'block' : 'hidden'} absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60 flex items-center justify-center cursor-pointer`}>
                    <FaPlay className='text-white opacity-100' />
                </div>
            </div>
            <div className='overflow-hidden flex flex-col'>
                <p className='truncate text-ellipsis text-[14px] font-semibold text-gray-600 cursor-pointer hover:text-primary'>{item?.title}</p>
                <p className='truncate text-ellipsis text-[12px] text-gray-500'>{item?.artistsNames}</p>
                <p className='truncate text-ellipsis text-[12px] text-gray-500'>{moment(item?.releaseDate * 1000).fromNow()}</p>
            </div>
        </div>
    )
}

export default ItemNewRelease
