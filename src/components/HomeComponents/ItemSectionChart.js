import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingSong, AudioPlay } from ".."
import { FaPlay } from 'react-icons/fa'
import * as actions from "../../store/actions"

const ItemSectionChart = ({ item, index, percent, textSd }) => {

  const dispatch = useDispatch()
  const [isHover, setIsHover] = useState(false)
  const { curSongId, isPlaying, loadingSong } = useSelector(state => state.music)

  return (
    <div
    onMouseEnter={() => {setIsHover(true)}}
    onMouseLeave={() => {setIsHover(false)}}
    className={`grid grid-cols-[15%,70%,15%] items-center bg-white bg-opacity-10 hover:bg-opacity-30 p-2 rounded-md cursor-pointer ${curSongId === item?.encodeId ? 'bg-opacity-30' : ''}`}>
      <div className={`flex items-center justify-center text-[30px] ${textSd} `}>
        <span className='text-[hsla(0%,0%,100%,0.7)] text-opacity-50'>{index + 1}</span>
      </div>
      <div className='flex items-center gap-4'>
        <div className='relative h-[60px] w-[60px] rounded-md object-cover '>
          <img src={item?.thumbnail} className='rounded-md object-cover' />
          {
            curSongId !== item?.encodeId && isHover && (
              <div 
              onClick={() => {
                dispatch(actions.setCurSongId(item?.encodeId))
                dispatch(actions.setPlay(true))
              }} 
              className='absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 rounded-md flex justify-center items-center'>
                  <FaPlay className='text-white'/>
              </div>
            )
          }
          {
            curSongId === item?.encodeId && (
              <div 
              onClick={() => {dispatch(actions.setPlay(!isPlaying))}}
              className='absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 rounded-md flex justify-center items-center'>
                {
                  loadingSong ? <LoadingSong className='text-white z-50' /> : isPlaying ? <AudioPlay /> : <FaPlay className='text-white' />
                }
              </div>
            )
          }
        </div>
        <div className='flex flex-col items-start text-gray-300'>
          <p className='text-[15px] opacity-70 font-medium'>{item?.title}</p>
          <p className='text-[13px] opacity-60'>{item?.artistsNames}</p>
        </div>
      </div>
      <div className='text-white font-semibold opacity-80 '>
        {percent.toString() + "%"}
      </div>
    </div>
  )
}

export default memo(ItemSectionChart)
