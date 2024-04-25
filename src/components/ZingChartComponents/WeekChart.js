import React from 'react'
import bgtop100 from "../../assets/images/bgtop100.jpeg"
import { BsFillPlayFill } from "react-icons/bs";
import { AlbumListItems } from ".."
import { useNavigate } from 'react-router-dom';

const WeekChart = ({ vnSongs, kSongs, usSongs }) => {

    const navigator = useNavigate()

    return (
        <div className='w-full relative rounded-md'>
            <img src={bgtop100} className='rounded-md z-0 opacity-20' />
            <div className='absolute top-0 left-0 right-0 bottom-0 rounded-md flex gap-3 flex-col p-10 z-10'>
                <h1 className='text-[40px] font-semibold text-primary'>Bảng Xếp Hạng Tuần</h1>
                <div className='grid grid-cols-3 gap-7'>
                    <div className='bg-white rounded-xl w-full h-full flex flex-col bg-opacity-50 gap-3 p-3'>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-[25px] pl-10 font-semibold text-primary '>{vnSongs?.name}</h1>
                            <div className='w-[25px] h-[25px] rounded-full flex items-center justify-center bg-primary'>
                                <BsFillPlayFill className='text-white' />
                            </div>
                        </div>
                        <AlbumListItems hd={true} songs={vnSongs?.data?.song?.items?.slice(0, 5)} section={false} totalDuration={vnSongs?.data?.song?.totalDuration} />
                        <div className='h-[50px] w-full flex justify-center items-center  px-[56px]'>
                            <button 
                            onClick={() => {navigator(`${vnSongs?.name}\\${vnSongs?.id}`)}}
                            className='px-5 py-2 rounded-full text-[13px] border-[1px] border-primary hover:bg-primary hover:text-white text-primary transition-all'>Xem tất cả</button>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl w-full h-full flex flex-col bg-opacity-50 gap-3 p-3'>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-[25px] pl-10 font-semibold text-primary '>{usSongs?.name}</h1>
                            <div className='w-[25px] h-[25px] rounded-full flex items-center justify-center bg-primary'>
                                <BsFillPlayFill className='text-white' />
                            </div>
                        </div>
                        <AlbumListItems hd={true} songs={usSongs?.data?.song?.items?.slice(0, 5)} section={false} totalDuration={usSongs?.data?.song?.totalDuration} />
                        <div className='h-[50px] w-full flex justify-center items-center  px-[56px]'>
                            <button 
                            onClick={() => {navigator(`${usSongs?.name}\\${usSongs?.id}`)}}
                            className='px-5 py-2 rounded-full text-[13px] border-[1px] border-primary hover:bg-primary hover:text-white text-primary transition-all'>Xem tất cả</button>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl w-full h-full flex flex-col bg-opacity-50 gap-3 p-3'>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-[25px] pl-10 font-semibold text-primary '>{kSongs?.name}</h1>
                            <div className='w-[25px] h-[25px] rounded-full flex items-center justify-center bg-primary'>
                                <BsFillPlayFill className='text-white' />
                            </div>
                        </div>
                        <AlbumListItems hd={true} songs={kSongs?.data?.song?.items?.slice(0, 5)} section={false} totalDuration={kSongs?.data?.song?.totalDuration} />
                        <div className='h-[50px] w-full flex justify-center items-center  px-[56px]'>
                            <button 
                            onClick={() => {navigator(`${kSongs?.name}\\${kSongs?.id}`)}}
                            className='px-5 py-2 rounded-full text-[13px] border-[1px] border-primary hover:bg-primary hover:text-white text-primary transition-all'>Xem tất cả</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeekChart
