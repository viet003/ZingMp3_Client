import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, Header } from '../../components'

const Main = () => {
  return (
    <div className='w-full flex h-full'>
      <div className='w-[300px] bg-sidebarbg'>
        <Sidebar />
      </div>
      <div className='w-full bg-primarybg'>
        <div className='h-[50px] px-[59px] flex items-center mb-5'>
          <Header />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Main
