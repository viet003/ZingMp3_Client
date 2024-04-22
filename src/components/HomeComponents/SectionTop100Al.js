import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { ItemsSectionNotSlider } from '..';

const SectionTop100Al = ({ items }) => {

    return (
        <div className='w-full flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
                <h1 className=' text-gray-600 font-semibold text-[20px]'>{items?.name}</h1>
                <div className='flex items-center justify-center text-[11px] cursor-pointer hover:underline text-gray-500 font-semibold hover:text-primary'>
                    <p className=''>TẤT CẢ</p>
                    <MdKeyboardArrowRight size={20} />
                </div>
            </div>
            <div className='grid grid-cols-5 gap-7'>
                {
                    items?.data?.slice(0, 5).map((item) => (
                        <ItemsSectionNotSlider item={item} isShow={true} key={item?.encodeId} />
                    ))
                }
            </div>
        </div>
    )
}

export default SectionTop100Al
