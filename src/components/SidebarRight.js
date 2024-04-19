import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GiAlarmClock } from "react-icons/gi";
import { BsThreeDots } from "react-icons/bs";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { PlayListSong } from '.';

const SidebarRight = ({ handleToggleTime }) => {

  const { playlist, curSongId, historyPlaylist } = useSelector(state => state.music)
  const [isActive, setIsActive] = useState(0)
  const [currentSong, setCurrentSong] = useState({})
  const [currentIndex, setCurrentIndex] = useState(-1)

  useEffect(() => {
    let crSong = playlist?.data?.filter(item => item?.encodeId === curSongId)[0]
    let crIndex = playlist?.data?.findIndex(item => item?.encodeId === curSongId)
    setCurrentSong(crSong)
    setCurrentIndex(crIndex)
    // console.log(crSong)
  }, [playlist, curSongId])


  return (
    <div className='w-full h-full pl-2'>
      <div className='h-[70ox] py-2 flex gap-2 items-center justify-between mb-2'>
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
        <div
          onClick={() => {handleToggleTime()}}
          data-tooltip-id="sbright-tooltip" data-tooltip-content="Hẹn giờ dừng phát nhạc" className='h-[30px] w-[30px] flex items-center justify-center bg-sidebarbg rounded-full cursor-pointer hover:bg-gray-300'>
          <GiAlarmClock size={20} style={{ color: 'gray' }} />
        </div>
        <div data-tooltip-id="sbright-tooltip" data-tooltip-content="Khác" className='h-[30px] w-[30px] flex items-center justify-center bg-sidebarbg rounded-full cursor-pointer hover:bg-gray-300'>
          <BsThreeDots size={17} style={{ color: 'gray' }} />
        </div>
      </div>
      {
        isActive === 0 ?
          <div className='h-full'>
            <div className='flex flex-col gap-2'>
              {
                currentSong && <PlayListSong item={currentSong} isCurrentSong={true} />
              }
              <div className='px-2 text-[14px] mb-2'>
                <p className='font-semibold'>Tiếp theo</p>
                <p><span className='text-gray-400'>Từ playlist</span><span className='ml-2 text-primary'>{playlist?.title}</span></p>
              </div>
            </div>
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200} style={{ width: '100%', height: '80%' }}>
              <div className='flex flex-col gap-2 pr-2'>
                <div>
                  {
                    playlist?.data?.filter(item => item.encodeId !== curSongId).slice(currentIndex, currentIndex + 20).map((item) => (
                      <PlayListSong item={item} key={item?.encodeId} isCurrentSong={false} />
                    ))
                  }
                </div>
              </div>
            </Scrollbars>
          </div> :
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200} style={{ width: '100%', height: '80%' }}>
            <div className='flex flex-col gap-2 pr-2'>
              {
                historyPlaylist?.map((item) => (
                  <PlayListSong item={item} key={item?.encodeId} isCurrentSong={false} />
                ))
              }
            </div>
          </Scrollbars>
      }
      <Tooltip id="sbright-tooltip" place='top' positionStrategy='absolute' style={{ fontSize: '12px', borderRadius: '20px' }} />
    </div>
  )
}

export default SidebarRight
