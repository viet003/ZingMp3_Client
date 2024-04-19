import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from 'react-redux';
import { ItemSectionNewRelease } from '.';

const SectionNewRelease = () => {
    const { newRelease } = useSelector(state => state.app)
    const [isActive, setIsActive] = useState(0);
    const [dataSong, setDataSong] = useState([]);

    useEffect(() => {
        if (newRelease) {
            isActive === 0 ? setDataSong(newRelease?.data?.all) : isActive === 1 ? setDataSong(newRelease?.data?.others) : setDataSong(newRelease?.data?.vPop);
        }
        // console.log(newRelease?.data?.all)
    }, [isActive, newRelease])

    return (
        <div className='w-full flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <h1 className=' text-gray-600 font-semibold text-[20px]'>{newRelease?.name}</h1>
                <div className='flex items-center justify-center text-[11px] cursor-pointer hover:underline text-gray-500 font-semibold hover:text-primary'>
                    <p className=''>TẤT CẢ</p>
                    <MdKeyboardArrowRight size={20} />
                </div>
            </div>
            <div className='flex justify-start gap-5 items-center text-[12px]'>
                <button onClick={(e) => { e.preventDefault(); setIsActive(0) }} className={`${isActive === 0 ? 'text-white bg-primary' : 'text-black bg-transparent'} border border-gray-300 rounded-full w-[100px] py-[4px]`}>TẤT CẢ</button>
                <button onClick={(e) => { e.preventDefault(); setIsActive(1) }} className={`${isActive === 1 ? 'text-white bg-primary' : 'text-black bg-transparent'} border border-gray-300 rounded-full w-[100px] py-[4px]`}>QUỐC TẾ</button>
                <button onClick={(e) => { e.preventDefault(); setIsActive(2) }} className={`${isActive === 2 ? 'text-white bg-primary' : 'text-black bg-transparent'} border border-gray-300 rounded-full w-[100px] py-[4px]`}>VIỆT NAM</button>
            </div>
            <div className='grid grid-cols-3 gap-x-7 gap-y-2'>
                {
                    dataSong?.slice(0, 12).map((item) => (
                        <ItemSectionNewRelease item={item} key={item?.encodeId} />
                    ))
                }
            </div>
        </div>
    )
}

export default SectionNewRelease
