import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";


const NewRelease = ({ items }) => {
    const [isActive, setIsActive] = useState(0);
    const [dataSong, setDataSong] = useState(items?.data?.all);

    useEffect(() => {
        isActive === 0 ? setDataSong(items?.data?.all) : isActive === 1 ? setDataSong(items?.data?.others) : setDataSong(items?.data?.vPop);
        console.log(dataSong)
    }, [isActive])

    return (
        <div className='w-full flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
                <h1 className=' text-gray-600 font-semibold text-[20px]'>{items?.name}</h1>
                <div className='flex items-center justify-center text-[11px] cursor-pointer hover:underline text-gray-500 font-semibold hover:text-primary'>
                    <p className=''>TẤT CẢ</p>
                    <MdKeyboardArrowRight size={20} />
                </div>
            </div>
            <div className='flex justify-start gap-5 items-center text-[12px]'>
                <button onClick={(e) => { e.preventDefault(); setIsActive(0) }} className={`${isActive === 0 ? 'text-white bg-primary' : 'text-black bg-transparent'} border border-gray-300 rounded-full w-[100px] py-[2px]`}>TẤT CẢ</button>
                <button onClick={(e) => { e.preventDefault(); setIsActive(1) }} className={`${isActive === 1 ? 'text-white bg-primary' : 'text-black bg-transparent'} border border-gray-300 rounded-full w-[100px] py-[2px]`}>VIỆT NAM</button>
                <button onClick={(e) => { e.preventDefault(); setIsActive(2) }} className={`${isActive === 2 ? 'text-white bg-primary' : 'text-black bg-transparent'} border border-gray-300 rounded-full w-[100px] py-[2px]`}>QUỐC TẾ</button>
            </div>
            <div className='grid grid-cols-3 gap-7'>
                {
                    dataSong?.slice(0, 12).map((item) => (
                        <div className='grid grid-cols-[20%,70%] gap-2'>
                            <div className='relative rounded-md overflow-hidden h-[60px] w-[60px]'> 
                                <img src={item?.thumbnail} className='rounded-md object-cover w-full h-full'/>
                            </div>
                            <div className='overflow-hidden'>
                                <p className='truncate text-ellipsis text-[11px]'>{item.title}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default NewRelease
