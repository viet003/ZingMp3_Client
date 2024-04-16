import React, { memo, useState } from 'react'

const ItemZingChartHome = ({ item, index, percent }) => {

  const [isHover, setIsHover] = useState(false)

  return (
    <div className='grid grid-cols-[15%,70%,15%] items-center'>
      <h1>{index + 1}</h1>
      <div className='flex items-center gap-4'>
        <div className='relative h-[60px] w-[60px] rounded-md object-cover '>
          <img src={item?.thumbnail} className='rounded-md object-cover'/>
        </div>
        <div className='flex flex-col items-start text-gray-300'>
          <p className='text-[15px] opacity-50 font-semibold'>{item?.title}</p>
          <p className='text-[13px] opacity-50'>{item?.artistsNames}</p>
        </div>
        <div className=''>
          {percent}
        </div>
      </div>
    </div>
  )
}

export default memo(ItemZingChartHome)
