import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarLeft, Header, Player, SidebarRight } from '../../components'
import { useSelector } from 'react-redux'

const Main = () => {
  const { curSongId } = useSelector(state => state?.music)

  // useEffect(() => {
  //   console.log(curSongId)
  // }, [curSongId])

  const [toggleSideBarRight, setToggleSideBarRight] = useState(false)
  const [timeOff, setTimeOff] = useState(false)

  const handleToggleSideBarRight = () => {
    setToggleSideBarRight(prev => !prev)
  }

  const handleToggleTime = () => {
    setTimeOff(prev => !prev)
  }

  return (
    <div className='w-full flex h-full'>
      <div className={`${curSongId ? ' h-[calc(100vh-90px)]' : 'h-screen'} w-[250px] bg-sidebarbg fixed top-0 left-0`}>
        <SidebarLeft />
      </div>
      <div className='w-[299px]'>

      </div>
      <div className='w-full bg-primarybg'>
        <div className='h-[70px] px-[59px] w-[calc(100%-250px)] flex items-center mb-5 fixed top-0 right-0 z-30 bg-primarybg'>
          <Header />
        </div>
        <div className='h-[70px] w-full'></div>
        <div className="px-[59px]">
          <Outlet />
        </div>
        <div className={`${curSongId ? 'h-[100px]' : 'h-0'} w-full`}>
        </div>
        <div className={`${toggleSideBarRight ? 'right-0' : '-right-[100%]'} fixed shadow-xl shadow-gray-500 top-0 z-40 w-[330px] h-screen bg-primarybg duration-300 ease-in-out`}>
          <SidebarRight handleToggleTime={handleToggleTime} />
        </div>
        {
          curSongId !== null && (
            <div className='h-[90px] fixed bottom-0 left-0 w-full z-40'>
              <Player handleToggleSideBarRight={handleToggleSideBarRight} toggleSideBarRight={toggleSideBarRight} />
            </div>
          )
        }
      </div>
      {
        timeOff && (
          <div className="fixed inset-0 flex justify-center items-center z-50 w-full">
            <div className="bg-gray-400 opacity-60 fixed inset-0 z-50 h-screen w-screen" onClick={(e) => { e.preventDefault(); setTimeOff(false) }}></div>
            <div div className='h-[330px] w-[330px] bg-primarybg rounded-xl flex flex-col items-center gap-5 p-10 z-50' >
              <p className='font-semibold text-[18px]'>Hẹn giờ dừng phát nhạc</p>
              <div className='w-full h-[100px] bg-gray-200 rounded-md grid grid-cols-[40%,20%,40%]'>
                <div><span></span>GIỜ</div>
                <div><span></span>PHÚT</div>
              </div>
              <p className='text-gray-500 text-[13px]'>Chọn thời gian để dừng phát nhạc</p>
              <button className='w-full text-white bg-primary flex items-center justify-center h-[40px] rounded-full'>LƯU LẠI</button>
              <button>HỦY</button>
            </div >
          </div>
        )
      }
    </div>
  )
}

export default Main

