import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GiAlarmClock } from "react-icons/gi";
import { BsThreeDots } from "react-icons/bs";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { PlayListSong } from '.';

const SidebarRight = () => {

  const { playlist, curSongId } = useSelector(state => state.music)
  const [isActive, setIsActive] = useState(0)
  const [currentSong, setCurrentSong] = useState({})
  const [currentIndex, setCurrentIndex] = useState(-1)

  useEffect(() => {
    let crSong = playlist?.data?.filter(item => item?.encodeId === curSongId)
    let crIndex = playlist?.data?.findIndex(item => item?.encodeId === curSongId)
    setCurrentSong(crSong[0])
    setCurrentIndex(crIndex)
    // console.log(crSong)
  }, [playlist, curSongId])


  return (
    <div className='w-full h-full p-2'>
      <div className='h-[70ox] py-2 flex gap-2 items-center justify-between'>
        <div className='bg-sidebarbg p-[4px] rounded-full flex'>
          <button
            onClick={() => { setIsActive(0) }}
            className={`${isActive === 0 ? 'bg-gray-100 text-primary shadow-sm' : 'bg-transparent text-gray-500'} h-[30px] w-[115px] text-[12px] flex items-center rounded-full justify-center font-semibold`}>
            Danh sách phát
          </button>
          <button
            onClick={() => { setIsActive(1) }}
            className={`${isActive === 1 ? 'bg-gray-100 text-primary shadow-sm' : 'bg-transparent text-gray-500'} h-[30px] w-[115px] text-[12px] flex items-center rounded-full justify-center font-semibold`}>
            Nghe gần đây
          </button>
        </div>
        <div data-tooltip-id="sbright-tooltip" data-tooltip-content="Hẹn giờ dừng phát nhạc" className='h-[30px] w-[30px] flex items-center justify-center bg-sidebarbg rounded-full cursor-pointer hover:bg-gray-300'>
          <GiAlarmClock size={20} style={{ color: 'gray' }} />
        </div>
        <div data-tooltip-id="sbright-tooltip" data-tooltip-content="Khác" className='h-[30px] w-[30px] flex items-center justify-center bg-sidebarbg rounded-full cursor-pointer hover:bg-gray-300'>
          <BsThreeDots size={17} style={{ color: 'gray' }} />
        </div>
      </div>
      <Scrollbars style={{ width: '100%', height: '80%' }}>
        <div className='flex flex-col gap-2'>
          <div>
            {/* {
            currentIndex !== -1 && playlist?.data?.slice(0, currentIndex).map((item) => (
              <PlayListSong item={item} key={item?.encodeId} />
            ))
          } */}
            {
              <PlayListSong item={currentSong} />
            }
          </div>
          <div className='px-2 text-[14px]'>
            <p className='font-semibold'>Tiếp theo</p>
            <p><span className='text-gray-400'>Từ playlist</span><span className='ml-2 text-primary'>{playlist?.title}</span></p>
          </div>
          <div>
            {/* {
             currentIndex !== -1 && playlist?.data?.slice(currentIndex).map((item) => (
              <PlayListSong item={item} key={item?.encodeId} />
            ))
          } */}
            {
              playlist?.data?.filter(item => item.encodeId !== curSongId).slice(currentIndex, currentIndex + 20).map((item) => (
                <PlayListSong item={item} key={item?.encodeId} />
              ))
            }
          </div>
        </div>
      </Scrollbars>
      <Tooltip id="sbright-tooltip" place='top' positionStrategy='absolute' style={{ fontSize: '12px', borderRadius: '20px' }} />
    </div>
  )
}

export default SidebarRight
