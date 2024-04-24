import React, { memo, useRef, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { AudioPlay, LoadingSong } from '..';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../../store/actions"
import { Tooltip } from 'react-tooltip'

const ItemsSectionRadio = ({ item }) => {
  const imgRef = useRef()
  const dispatch = useDispatch()
  const [isHover, setIsHover] = useState(false)
  const { curSongId, loadingSong, isPlaying } = useSelector(state => state.music)

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
          className='relative overflow-hidden h-[150px] w-[150px] rounded-full border-[4px] border-[#E8917D]'>
          <img ref={imgRef} src={item?.program?.thumbnail} className='rounded-full object-cover w-full h-full' loading='lazy' />
          {
            curSongId !== item.encodeId && <div
              onClick={() => {
                // console.log(item?.encodeId)
                // dispatch(actions.setCurSongId(item?.encodeId))
                // dispatch(actions.setPlay(true))
              }}
              className={`${isHover && curSongId !== item?.encodeId ? 'flex' : 'hidden'} absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 items-center justify-center cursor-pointer`}>
              <FaPlay className='text-white opacity-100' />
            </div>
          }
          {
            curSongId === item.encodeId && <div
              onClick={() => { dispatch(actions.setPlay(!isPlaying)) }}
              className={`flex absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 items-center justify-center cursor-pointer`}>
              {
                loadingSong ? <LoadingSong className='text-white z-50' /> : isPlaying ? <AudioPlay /> : <FaPlay className='text-white' />
              }
            </div>
          }
        </div>
        <div className='absolute w-[50px] h-[50px] border-2 border-[#91A3B0] rounded-full right-3 bottom-2'>
          <img src={item?.thumbnail} className='rounded-full object-cover w-full h-full' loading='lazy' />
        </div>
        <div className='absolute bg-red-600 bottom-0  px-3 rounded-md'>
          <p className='text-[11px] text-white'>LIVE</p>
        </div>
        <Tooltip id="newRelease-toolTip" style={{ fontSize: '12px', borderRadius: '20px', backgroundColor: 'gray' }} />
      </div>
      <div className='w-full flex flex-col justify-center items-center mt-2'>
        <p className='font-semibold text-gray-600'>{item?.host?.name}</p>
        <p className='text-gray-500 text-[12px]'>{item?.activeUsers} đang nghe</p>
      </div>
    </div>
  )
}

export default memo(ItemsSectionRadio)
