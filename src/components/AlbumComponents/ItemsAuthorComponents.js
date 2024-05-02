import React, { memo, useRef, useState } from 'react'
import { CiShuffle } from "react-icons/ci";

const ItemsAuthorComponents = ({ item }) => {
  const imgRef = useRef()
  const [isHover, setIsHover] = useState(false)

  const handleHover = () => {
    setIsHover(true);
    if (imgRef.current) {
      imgRef.current.classList?.remove('animate-scale-down');
      imgRef.current.classList?.add('animate-scale-up');
    }
  };

  const handleOut = () => {
    setIsHover(false);
    if (imgRef.current) {
      imgRef.current.classList?.remove('animate-scale-up');
      imgRef.current.classList?.add('animate-scale-down');
    }
  };

  return (
    <div className='flex flex-col'>
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleOut}
        className="relative flex justify-center items-center">
        <div
          className='relative overflow-hidden h-[230px] w-[230px] rounded-full border-[4px] border-[#E8917D]'>
          <img ref={imgRef} src={item?.thumbnail} className='rounded-full object-cover w-full h-full' loading='lazy' />
          <div
            className={`flex absolute top-0 left-0 right-0 bottom-0 ${isHover ? 'bg-black' : 'bg-transparent'} bg-opacity-60 items-center justify-center cursor-pointer`}>
            {
              isHover && <div className='h-[50px] w-[50px] flex items-center justify-center border-2 rounded-full border-opacity-80 border-white'><CiShuffle className='text-white' size={30}/></div>
            }
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col justify-center items-center mt-2 gap-1'>
        <p className='font-semibold text-gray-600 cursor-pointer hover:underline hover:text-primary'>{item?.name}</p>
        <p className='text-gray-500 text-[13px]'>{Math.round(parseInt(item?.totalFollow) / 1000)}k quan tâm</p>
        <buton className="text-[13px] bg-primary text-white rounded-full px-5 py-1 cursor-pointer hover:bg-hover">
            QUAN TÂM
        </buton>
      </div>
    </div>
  )
}

export default memo(ItemsAuthorComponents)
