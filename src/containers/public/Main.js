import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarLeft, Header, Player, SidebarRight, SetTimeOffMusic } from '../../components'
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
          <SetTimeOffMusic setTimeOff={setTimeOff}/>
        )
      }
    </div>
  )
}

export default Main

