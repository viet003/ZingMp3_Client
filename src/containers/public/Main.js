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
      <div className='w-[300px]'>

      </div>
      <div className='w-full bg-primarybg'>
        <div className='h-[70px] px-[59px] flex items-center mb-5'>
          <Header />
        </div>
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
