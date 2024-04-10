import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, Header, Player } from '../../components'
import { useSelector } from 'react-redux'

const Main = () => {
  const { curSongId } = useSelector(state => state?.music)

  // useEffect(() => {
  //   console.log(curSongId)
  // }, [curSongId])

  return (
    <div className='w-full flex h-full'>
      <div className={`${curSongId ? ' h-[calc(100vh-90px)]' : 'h-screen'} w-[250px] bg-sidebarbg fixed top-0 left-0`}>
        <Sidebar />
      </div>
      <div className='w-[299px]'>

      </div>
      <div className='w-full bg-primarybg'>
        <div className='h-[70px] px-[59px] w-[calc(100%-250px)] flex items-center mb-5 fixed top-0 right-0 z-50 bg-primarybg'>
          <Header />
        </div>
        <div className='h-[70px] w-full'></div>
        <div className="px-[59px]">
          <Outlet />
        </div>
        {
          curSongId !== null && (
            <div className='h-[90px] fixed bottom-0 left-0 w-full'>
              <Player />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Main
