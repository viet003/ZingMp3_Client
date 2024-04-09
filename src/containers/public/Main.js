import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, Header, Player } from '../../components'
import { useSelector } from 'react-redux'

const Main = () => {
  const { curSongId } = useSelector(state => state?.music)

  useEffect(() => {
    console.log(curSongId)
  }, [curSongId])

  return (
    <div className='w-full flex h-full'>
      <div className='w-[300px] bg-sidebarbg'>
        <Sidebar />
      </div>
      <div className='w-full bg-primarybg'>
        <div className='h-[50px] px-[59px] flex items-center mb-5'>
          <Header />
        </div>
        <div className="px-[59px]">
          <Outlet />
        </div>
        {
          curSongId !== null && (
            <div className='h-[100px] fixed bottom-0 left-0 w-full'>
              <Player />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Main
